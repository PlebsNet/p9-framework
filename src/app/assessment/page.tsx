"use client";

import React from "react";
import { useAccount } from 'wagmi';
import Web2Assessment from "./components/web2";
import Web3Assessment from "./components/web3";

export default function Assessment() {
  const { isConnected } = useAccount();

  return (
    <div>
      {isConnected ? <Web3Assessment /> : <Web2Assessment />}
    </div>
  );
}
