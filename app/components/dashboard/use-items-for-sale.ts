import useSWR from "swr";
import { getItemsForSaleAction } from "./get-items-for-sale-action";

/**
 * This SWR hook handles fetching + periodically refreshing the items for sale.
 */
export function useItemsForSale() {
  const { data, error } = useSWR(
    "itemsForSale",
    async () => {
      try {
        return getItemsForSaleAction();
      } catch (error) {
        console.error("Failed to fetch recent listings data", error);
        throw new Error("Failed to fetch recent listings data");
      }
    },
    { suspense: true }
  );

  return { data, error };
}
