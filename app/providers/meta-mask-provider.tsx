"use client";
import { MetaMaskProvider as SdkMetaMaskProvider } from "metamask-react";

import { PropsWithChildren } from "react";

export function MetaMaskProvider({ children }: PropsWithChildren) {
  return (
    <SdkMetaMaskProvider
      sdkOptions={{
        dappMetadata: {
          name: "BitBizaar",
          url:
            typeof window !== "undefined" && window.location.hostname
              ? window.location.hostname
              : "",
        },
      }}
    >
      {children}
    </SdkMetaMaskProvider>
  );
}
