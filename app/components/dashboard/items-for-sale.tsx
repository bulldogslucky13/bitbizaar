"use client";
import { Suspense } from "react";
import { CreateNewListingButton } from "./create-new-listing-button/create-new-listing-button";
import { useItemsForSale } from "./use-items-for-sale";
import { truncateAddress } from "@/app/utils/truncate-address";
import { utils } from "web3";
import { Button } from "react-aria-components";

export function ItemsForSaleSection() {
  return (
    <section>
      <div className="flex w-full justify-between">
        <h2 className="font-medium text-xl">Items for Sale</h2>
        <CreateNewListingButton />
      </div>
      <p>Checkout these awesome products for sale</p>
      <Suspense fallback={<>Loading...</>}>
        <ItemsForSale />
      </Suspense>
    </section>
  );
}

function ItemsForSale() {
  const { data: itemsForSale, error } = useItemsForSale();

  if (error) {
    return <section>{error.message}</section>;
  }

  if (itemsForSale.length === 0) {
    return (
      <section className="mt-2">
        <p className="italic text-center">
          Looks like there are no Bits in the market :(
          <br />
          <br />
          How about you change that? Click &ldquo;Create Listing&rdquo; to get
          this party started
        </p>
      </section>
    );
  }

  return (
    <section className="flex gap-2 mt-2 overflow-x-scroll">
      {itemsForSale.map((item) => (
        <article
          key={item.id}
          className="flex flex-col p-4 rounded-md bg-slate-700"
        >
          <p className="font-medium">{item.title}</p>
          <dl className="flex gap-1">
            <dt>Seller:</dt>
            <dd>{truncateAddress(item.seller)}</dd>
          </dl>
          <dl className="flex gap-1">
            <dt>Price (ETH):</dt>
            <dd>{utils.fromWei(Number(item.price), "ether")}</dd>
          </dl>
          <Button
            className="px-4 py-2 bg-slate-500 rounded-md mt-2 
          hover:bg-slate-600 active:bg-slate-700 transition-colors 0.1s"
            onPress={() => console.log("CAMERON TODO - implement")}
          >
            Buy Item
          </Button>
        </article>
      ))}
    </section>
  );
}
