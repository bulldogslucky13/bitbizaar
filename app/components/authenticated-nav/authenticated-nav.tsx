import { truncateAddress } from "@/app/utils/truncate-address";
import { useMetaMask } from "metamask-react";
import { PropsWithChildren } from "react";

export function AuthenticatedNav({ children }: PropsWithChildren) {
  const { account } = useMetaMask();

  if (!account)
    throw new Error("User not logged in! Please log in to see this page");

  return (
    <div className="flex flex-col h-[100svh] overflow-y-clip">
      <nav className="flex justify-between w-full px-4 py-2 bg-slate-500">
        <p>BitBizaar</p>
        <p className="font-md font-bold">{truncateAddress(account)}</p>
      </nav>
      {children}
    </div>
  );
}
