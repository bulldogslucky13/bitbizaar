import Web3 from "web3";
import { contractDefinition } from "./contractDefinition";

const web3Client = new Web3(
  process.env.INFURA_V3_API_KEY
    ? `https://sepolia.infura.io/v3/${process.env.INFURA_V3_API_KEY}`
    : "UNSET_VALUE"
);

/**
 * This client is our main interaction with our BitBizaarMarketplaceContract
 */
export const contractClient = new web3Client.eth.Contract(
  contractDefinition.abi,
  process.env.CONTRACT_ADDRESS
);
