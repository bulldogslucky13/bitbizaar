"use client";
import { Suspense } from "react";
import { CreateNewListingButton } from "./create-new-listing/create-new-listing-button";
import { useItemsForSale } from "./use-items-for-sale";
import { truncateAddress } from "@/app/utils/truncate-address";
import { utils } from "web3";
import { BuyItemButton } from "./buy-item/buy-item-button";
import { useMetaMask } from "metamask-react";

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

  const { account } = useMetaMask();

  if (!account) {
    return (
      <section className="mt-2">
        <p className="italic text-center">Sign in to see items for sale!</p>
      </section>
    );
  }

  if (error) {
    return <section className="mt-2">{error.message}</section>;
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
          className="flex flex-col justify-between p-4 rounded-md bg-slate-700"
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
          <BuyItemButton
            itemId={Number(item.id)}
            price={Number(item.price)}
            buyerAddress={account}
          />
        </article>
      ))}
    </section>
  );
}
