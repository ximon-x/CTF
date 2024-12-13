import algosdk from "algosdk";
import dotenv from "dotenv";
dotenv.config();

const env = {
  algodToken: process.env.ALGOD_TOKEN!,
  algodServer: process.env.ALGOD_SERVER!,
  algodPort: process.env.ALGOD_PORT!,
  algodNetwork: process.env.ALGOD_NETWORK!,

  indexerToken: process.env.INDEXER_TOKEN!,
  indexerServer: process.env.INDEXER_SERVER!,
  indexerPort: process.env.INDEXER_PORT!,
  indexerNetwork: process.env.INDEXER_NETWORK!,

  mnemonic: process.env.MNEMONIC,
};

const algodClient = new algosdk.Algodv2(
  env.algodToken,
  env.algodServer,
  env.algodPort
);

const indexerClient = new algosdk.Indexer(
  env.indexerToken,
  env.indexerServer,
  env.indexerPort
);

const account = algosdk.mnemonicToSecretKey(env.mnemonic!);

const config = {
  algodClient,
  indexerClient,
  account,
};

export default config;
