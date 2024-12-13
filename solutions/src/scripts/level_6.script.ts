import { AlgoAmount } from "@algorandfoundation/algokit-utils/types/amount";
import config from "../config";
import algosdk from "algosdk";

// Level 6: Contract to Contract (ABI Compliant)
// AppID: 724672965
// During the OptIn the application will perform an inner transaction call to
// an app ID you provide, passing 2 numbers using the ABI method
// `sum(uint64,uint64)uint64`. The response (LastLog) must be the sum. The
// apps creator address must also be the same as the sender.

// Solution: Create a smart contract that sums two arguments and returns the result.

const myAppId = 728733449;

export default async function l6() {
  const { account, algodClient } = config;

  const appId = 724672965;
  const prevAppId = 724672951;

  const appAddress = algosdk.getApplicationAddress(appId);
  const suggestedParams = await algodClient.getTransactionParams().do();

  const optInTxn = algosdk.makeApplicationOptInTxnFromObject({
    appIndex: appId,
    foreignApps: [prevAppId, myAppId],
    from: config.account.addr,
    suggestedParams: {
      ...suggestedParams,
      fee: AlgoAmount.Algos(0.01).microAlgos,
    },
  });

  const signedTxn = optInTxn.signTxn(account.sk);
  const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
  await algosdk.waitForConfirmation(algodClient, txId, 3);

  return {
    txId,
    appId,
    appAddress,
  };
}
