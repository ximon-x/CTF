import { AlgoAmount } from "@algorandfoundation/algokit-utils/types/amount";
import config from "../config";
import algosdk, { makeBasicAccountTransactionSigner } from "algosdk";
import fs from "fs";
import path from "path";

// Level 7: Contract to Contract Authorization (ABI Compliant)
// AppID: 724672968
// Only accounts which are authorized may OptIn. Authorization is granted via
// an inner transaction to the application's `authorize(address)void` method,
// and is only valid for the current round.

// Solution: Create a smart contract that authorizes your account. Call your smart contract at the same time as you OptIn.

const myAppId = 728734152;

export default async function l7() {
  const { account, algodClient } = config;

  const appId = 724672968;
  const prevAppId = 724672965;

  const appAddress = algosdk.getApplicationAddress(appId);
  const suggestedParams = await algodClient.getTransactionParams().do();

  const atc = new algosdk.AtomicTransactionComposer();

  const abi = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "..", "dist", "/Ximon.arc32.json"),
      "utf8"
    )
  );

  const contract = new algosdk.ABIContract(abi.contract);

  atc.addMethodCall({
    appID: myAppId,
    method: contract.getMethodByName("call_authorize"),
    methodArgs: [],
    sender: account.addr,
    signer: makeBasicAccountTransactionSigner(account),
    suggestedParams,
  });

  const optInTxn = algosdk.makeApplicationOptInTxnFromObject({
    appIndex: appId,
    foreignApps: [prevAppId, myAppId],
    from: config.account.addr,
    suggestedParams: {
      ...suggestedParams,
      fee: AlgoAmount.Algos(0.01).microAlgos,
    },
  });

  atc.addTransaction({
    txn: optInTxn,
    signer: makeBasicAccountTransactionSigner(account),
  });

  const { txIDs } = await atc.execute(algodClient, 4);

  return {
    txIDs,
    appId,
    appAddress,
  };
}
