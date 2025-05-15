import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

const prisma = globalForPrisma.prisma || new PrismaClient({
  // Enable detailed logging in development
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "info", "warn", "error"]
      : ["error"],
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Optional: gracefully close Prisma on process termination
if (typeof process !== "undefined" && process.on) {
  process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
  process.on("SIGTERM", async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

export default prisma;
