import type { RequestInternal } from "next-auth";
import { getAddress, isAddress, verifyMessage } from "ethers";
import { type NextAuthOptions } from "next-auth";
import type { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { SiweMessage } from "siwe";
import { cookies } from "next/headers";

// Define extended user type for TypeScript safety
interface ExtendedUser extends User {
  ethAddress?: string;
}

// Fallback error handling for missing Google env vars
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth environment variables.");
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "siwe",
      name: "SIWE",
      credentials: {
        message: { label: "Message", type: "text" },
        signature: { label: "Signature", type: "text" },
      },
      async authorize(
        credentials: Record<"message" | "signature", string> | undefined,
        req: Pick<RequestInternal, "query" | "headers" | "body" | "method">
      ): Promise<ExtendedUser | null> {
        try {
          if (!credentials?.message || !credentials?.signature) {
            return null;
          }

          // Parse the SIWE message with detailed error handling
          let siwe;
          let parsedMessage;
          try {
            siwe = new SiweMessage(credentials.message);
            parsedMessage = siwe;
          } catch (parseError) {
            console.error("❌ Failed to construct SIWE message:", parseError);
            console.error("Message content:", credentials.message);
            return null;
          }

          // Get the nonce from cookies with enhanced logging
          const cookieStore = await cookies();
          const nonceCookie = cookieStore.get("siwe-nonce");
          const nonce = nonceCookie?.value;

          if (!nonce) {
            console.warn("❌ Missing nonce cookie - this must be set before authorization");
            return null;
          }

          // Skip domain verification in development
          const options = process.env.NODE_ENV === "development"
            ? {
              signature: credentials.signature,
              nonce: nonce
            }
            : {
              signature: credentials.signature,
              domain: parsedMessage.domain,
              nonce: nonce
            };

          console.log("Using verification options:", options);

          if (!isAddress(siwe.address)) {
            console.warn("❌ Invalid Ethereum address format:", siwe.address);
            return null;
          }

          const address = getAddress(siwe.address);

          // Find existing user by Ethereum address
          let user = await prisma.user.findUnique({
            where: { ethAddress: address },
          });

          if (!user) {
            // Create new user if not found
            try {
              user = await prisma.user.create({
                data: { ethAddress: address },
              });
            } catch (dbError) {
              console.error("❌ Database error creating user:", dbError);
              return null;
            }
          }

          if (!user) {
            return null;
          }

          // Return user with proper type conversion
          return {
            id: String(user.id),
            name: user.name || undefined,
            email: user.email || undefined,
            image: user.image || undefined,
            ethAddress: user.ethAddress || undefined,
          };
        } catch (error) {
          console.error("❗ SIWE authorize unhandled error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {

        const email = user.email;
        const ethAddress = (user as ExtendedUser).ethAddress;

        if (!email && !ethAddress) {
          console.warn("🧨 [signIn] Missing both email and ethAddress — rejecting sign-in");
          return false;
        }

        // Always allow SIWE sign-ins
        if (account?.provider === "siwe") {
          return true;
        }

        // For other providers, check if we should link accounts
        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [
              { email: email ?? undefined },
              { ethAddress: ethAddress ?? undefined },
            ],
          },
        });

        if (existingUser) {
          const needsUpdate =
            (!existingUser.email && email) || (!existingUser.ethAddress && ethAddress);

          if (needsUpdate) {
            await prisma.user.update({
              where: { id: existingUser.id },
              data: {
                email: existingUser.email ?? email,
                ethAddress: existingUser.ethAddress ?? ethAddress,
              },
            });
          }
        }
  
        return true;
      } catch (error) {
        console.error("❌ signIn error:", error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      // When a user signs in, add their data to the token
      if (user) {
        token.sub = user.id;
        token.email = user.email ?? null;
        token.name = user.name ?? null;
        token.picture = user.image ?? null;
        token.ethAddress = (user as ExtendedUser).ethAddress ?? null;
      }

      // Include the sign-in provider if available
      if (account) {
        token.provider = account.provider;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        // Transfer data from token to session
        session.user.id = token.sub;
        session.user.email = token.email as string | null;
        session.user.name = token.name as string | null;
        session.user.image = token.picture as string | null;
        (session.user as ExtendedUser).ethAddress = token.ethAddress as string | null;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/signin",
  },
  debug: process.env.NODE_ENV === "development",
};

export default authOptions;