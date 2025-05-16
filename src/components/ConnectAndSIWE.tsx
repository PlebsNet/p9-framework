import React, { useState, useEffect, useCallback } from 'react';
import { getCsrfToken, signIn } from 'next-auth/react';
import { SiweMessage } from 'siwe';
import { useAccount, useConnect, useSignMessage } from 'wagmi';
import { cbWalletConnector } from "@/lib/wagmiConfig";
import { toast } from "sonner";
import { Button } from './ui/Button';

interface ConnectAndSIWEProps {
  onConnectChange?: (connected: boolean) => void;
  onVerified?: (address: string) => void;
}

export const ConnectAndSIWE: React.FC<ConnectAndSIWEProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [processingStep, setProcessingStep] = useState('');
  const [shouldSignIn, setShouldSignIn] = useState(false);

  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { signMessageAsync } = useSignMessage();

  // Handle wallet connection separately
  const handleWalletConnect = async () => {
    try {
      setIsLoading(true);
      setError('');
      setProcessingStep('Connecting wallet...');

      // Connect the wallet and wait for the connection
      await connect({ connector: cbWalletConnector });
      console.log('✅ Wallet connection initiated');

      // Flag to trigger sign-in after connection is established
      setShouldSignIn(true);
    } catch (e) {
      console.error('❌ Connection error:', e);
      setError(`Wallet connection error: ${e instanceof Error ? e.message : String(e)}`);
      setIsLoading(false);
      setProcessingStep('');
    }
  };

  // Handle SIWE sign-in
  const handleSignIn = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      setProcessingStep('Getting authentication nonce...');

      if (!isConnected || !address) {
        throw new Error('No wallet address found. Please check your wallet connection.');
      }

      // 1. Get a nonce from your API
      const nonceRes = await fetch('/api/auth/nonce');
      const { nonce } = await nonceRes.json();
      if (!nonce) {
        throw new Error('Failed to get nonce!');
      }
      console.log('✅ Received nonce:', nonce);

      // 2. Get CSRF token - needed for NextAuth
      const csrfToken = await getCsrfToken();
      if (!csrfToken) {
        throw new Error('Failed to get CSRF token');
      }
      console.log('✅ Got CSRF token');

      // 3. Create SIWE message with EXACT domain format
      const domain = window.location.host.split(':')[0]; // Get hostname without port
      const message = new SiweMessage({
        domain,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId: 1, // I need to work on this!
        nonce
      });

      // Convert to string for signing
      const messageString = message.prepareMessage();
      console.log('✅ Prepared message:', messageString);

      // 4. Sign the message with the wallet
      setProcessingStep('Please sign the message in your wallet...');
      const signature = await signMessageAsync({ message: messageString });
      console.log('✅ Got signature:', signature);

      // 5. Verify the signature
      setProcessingStep('Verifying signature...');
      const response = await signIn('siwe', {
        message: message.prepareMessage(),
        signature,
        redirect: false,
        callbackUrl: '/' // Where to redirect after successful sign-in
      });

      if (response?.error) {
        console.error('❌ Sign-in error:', response.error);
        throw new Error(`Sign-in error: ${response.error}`);
      } else {
        console.log('✅ Successfully authenticated!');
        setProcessingStep('Success! Redirecting...');
        // Redirect or update UI as needed
        window.location.href = response?.url || '/';
      }
    } catch (e) {
      console.error('❌ Authentication error:', e);
      setError(`${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setIsLoading(false);
      setProcessingStep('');
      setShouldSignIn(false);
    }
  }, [isConnected, address, signMessageAsync]);

  // Automatically trigger sign-in when wallet connection completes
  useEffect(() => {
    if (isConnected && address && shouldSignIn) {
      console.log('✅ Wallet connected - address available:', address);
      // Small delay to ensure everything is properly initialized
      const timer = setTimeout(() => {
        handleSignIn();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isConnected, address, shouldSignIn, handleSignIn]);

  useEffect(() => {
    if (processingStep) {
      toast(processingStep);
    }
  }, [processingStep]);

  // Trigger the "connect wallet" flow, which will then trigger sign-in
  const handleConnectAndSignIn = () => {
    setShouldSignIn(true);
    handleWalletConnect();
  };

  return (
    <div className="flex flex-col items-center w-full">
      {!isConnected ? (
        // Not connected - show the connect button
        <Button
          onClick={handleConnectAndSignIn}
          disabled={isLoading}
          className="mb-3 w-full"
        >
          {isLoading ? 'Connecting...' : 'Connect with Base'}
        </Button>
      ) : (
        // Already connected - show fallback sign in button for Next Auth
        <Button
          onClick={handleSignIn}
          disabled={isLoading}
          className="mb-3 w-full"
        >
          {isLoading ? 'Signing in...' : 'Sign in with Base'}
        </Button>
      )}

      {error && (
        <div className="mt-2 text-red-500 text-sm">
          {error}
        </div>
      )}

      {isConnected && address && !isLoading && (
        <div className="mt-2 text-sm text-gray-600">
          Connected: {address}
        </div>
      )}
    </div>
  );
};