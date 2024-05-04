# Smart Contract

This code is a modified version of the tutorial found here:

https://docs.infura.io/tutorials/ethereum/deploy-a-contract-using-web3.js?q=filter#6-create-the-compile-script

## Files

### BitBizaarContract.sol

This is our actual Smart Contract. This is the file that defines all of the backend functionality for our application.

### compile.js

Used to compile our Contract into an uploadable format. This command produces an ABI and Binary read out of the Contract. The ABI can be used for generating helpful types, while the Binary is what we actually upload to the Ethereum network to be ran

### deploy.js

This file handles uploaded the compiled smart contract to the Ethereum network.

## Running

```bash
npm run compile-smart-contract && npm run deploy-smart-contract
```
