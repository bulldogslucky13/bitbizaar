"use client";
import { MetaMaskLoginForm } from "./components/meta-mask-login/meta-mask-login-form";
import { useMetaMask } from "metamask-react";
import { ItemsForSaleSection } from "./components/dashboard/items-for-sale";
import { AuthenticatedNav } from "./components/authenticated-nav/authenticated-nav";

export default function Home() {
  const { status: metaMaskAccountLoginStatus, account } = useMetaMask();

  if (metaMaskAccountLoginStatus !== "connected") return <MetaMaskLoginForm />;

  return (
    <AuthenticatedNav>
      <main className="flex-1 overflow-y-scroll space-y-4 m-4">
        <ItemsForSaleSection />
      </main>
    </AuthenticatedNav>
  );
}
