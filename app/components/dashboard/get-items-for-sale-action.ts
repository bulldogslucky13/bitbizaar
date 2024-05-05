"use server";

import { contractClient } from "@/app/clients/web3";

/**
 *
 * @returns This action gets all of the current items for sale on the market place
 */
export async function getItemsForSaleAction() {
  return contractClient.methods.getItemsForSale().call();
}
