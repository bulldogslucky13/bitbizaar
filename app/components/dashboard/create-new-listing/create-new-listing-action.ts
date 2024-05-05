"use server";
import { contractClient } from "@/app/clients/web3";

type NewListing = {
  title: string;
  description: string;
  price: number;
  fromAddress: string;
};

/**
 * This action handles creating a new listing
 */
export async function createNewListingAction({
  title,
  description,
  price,
  fromAddress,
}: NewListing) {
  await contractClient.methods
    .listItem(title, description, price)
    .send({
      from: fromAddress,
    })
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(`https://sepolia.etherscan.io/tx/${txhash}`);
    });

  console.log("Transaction successful!");
}
