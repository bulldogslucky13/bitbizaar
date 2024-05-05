"use server";

import { contractClient } from "@/app/clients/web3";

/**
 * This action handles buying an item for sale
 */
export async function buyItemAction({
  itemId,
  price,
  buyerAddress,
}: {
  itemId: number;
  price: number;
  buyerAddress: string;
}) {
  await contractClient.methods
    .purchaseItem(itemId)
    .send({ from: buyerAddress, value: price.toString() })
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(`https://sepolia.etherscan.io/tx/${txhash}`);
    });

  console.log("Transaction successful!");
}
