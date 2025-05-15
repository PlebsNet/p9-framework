import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { generateNonce } from 'siwe';

export const GET = async () => {
  try {
    const nonce = generateNonce();
    const cookieStore = await cookies();
    cookieStore.set('siwe-nonce', nonce, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 5,
    });

    return NextResponse.json({ nonce });
  } catch (error) {
    console.error('Error generating nonce:', error);
    return NextResponse.json(
      { error: 'Failed to generate nonce' },
      { status: 500 }
    );
  }
}  