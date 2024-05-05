# BitBizaar

Welcome to my decentralized Ethereum marketplace!

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the marketplace in acton.

## Lay of the Land

### /smart-contract

This domain houses all of my code pertaining to creating, compiling, and deploying my smart contract. See the README in that folder for more details.

### app

General folder where all of the client implementation for the BitBizaar lives.

All of the code for interacting with the network is split between the `app/clients` and `app/components` domains.

- `app/clients`
  This folder houses the contract definition, and web3 client. Here is where you can see how we set up our contract, including exporting a type-safe contract client to use.

- `app/components`
  Inside each sub-directory, files exist ending in `...-action.ts`. These files are where all of our Web3 interactions occur. These are Next.JS server actions, so all of these things happen on the Next.JS server, and not on the client themselves. The client calls these server actions, but the client is never hitting the Ethereum network directly - always through my server.
