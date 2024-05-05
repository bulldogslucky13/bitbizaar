import { Button } from "react-aria-components";
import { buyItemAction } from "./buy-item-action";
import { useState } from "react";
import { LoadingSpinner } from "../../loading-spinner/loading-spinner";

export function BuyItemButton({
  itemId,
  price,
  buyerAddress,
}: {
  itemId: number;
  price: number;
  buyerAddress: string;
}) {
  const [isBuying, setIsBuying] = useState(false);

  return (
    <Button
      className="flex items-center justify-center gap-1 px-4 py-2 bg-slate-500 text-white rounded-md mt-2 transition-colors 0.1s
  hover:bg-slate-600 active:bg-slate-700
  disabled:bg-slate-600 disabled:text-slate-400"
      onPress={async () => {
        setIsBuying(true);
        try {
          await buyItemAction({ itemId, price, buyerAddress });
        } finally {
          setIsBuying(false);
        }
      }}
      isDisabled={isBuying}
    >
      {isBuying ? (
        <LoadingSpinner
          width={16}
          height={16}
          variant="solid"
          isIndeterminate
        />
      ) : null}
      <span>{isBuying ? "Buying..." : "Buy Item"}</span>
    </Button>
  );
}
