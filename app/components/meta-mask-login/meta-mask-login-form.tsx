"use client";

import { useMetaMask } from "metamask-react";
import { MetaMaskIcon } from "../../icons/meta-mask-icon";

export function MetaMaskLoginForm() {
  const { connect: loginMetaMaskResult, status } = useMetaMask();

  async function handleConnect() {
    try {
      await loginMetaMaskResult();
    } catch (err) {
      console.warn("Failed to connect..", err);
    }
  }

  return (
    <div className="flex flex-col h-[100svh] w-[100svw] items-center justify-center">
      <article className="flex flex-col p-4 rounded-lg bg-slate-800 gap-3">
        <header>
          <h1 className="font-medium text-lg">BitBizaar Login</h1>
          <p>Login with your MetaMask login to proceed</p>
          {status === "connecting" ? (
            <p className="text-blue-300 text-center italic my-1">
              Connecting...
            </p>
          ) : null}
          {status === "connected" ? (
            <p className="text-green-300 text-center italic my-1">
              Connected! Redirecting...
            </p>
          ) : null}
        </header>
        <button
          className="text-white bg-slate-500 px-4 py-2 rounded-md flex items-center disabled:text-slate-100 disabled:bg-slate-700"
          disabled={status === "connecting"}
          onClick={handleConnect}
        >
          <MetaMaskIcon />
          Connect with MetaMask
        </button>
      </article>
    </div>
  );
}
