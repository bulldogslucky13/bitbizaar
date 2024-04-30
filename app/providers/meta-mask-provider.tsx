"use client";
import { MetaMaskProvider as SdkMetaMaskProvider } from "@metamask/sdk-react";

import { PropsWithChildren } from "react";

export function MetaMaskProvider({ children }: PropsWithChildren) {
  return (
    <SdkMetaMaskProvider
      sdkOptions={{
        dappMetadata: {
          name: "BitBizaar",
          url: window.location.href,
        },
      }}
    >
      {children}
    </SdkMetaMaskProvider>
  );
}
