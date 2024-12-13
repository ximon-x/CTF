import { AlgoAmount } from "@algorandfoundation/algokit-utils/types/amount";
import config from "../config";
import algosdk from "algosdk";

// Level 1: Pay To Win
// AppID: 724672937
// The OptIn transaction must be grouped with a 1 Algo payment to the application.

// Solution: Group a payment transaction to the application's address along with the OptIn.
export default async function l1() {
  const { account, algodClient } = config;

  const prevAppId = 724672936;
  const appId = 724672937;

  const appAddress = algosdk.getApplicationAddress(appId);
  const suggestedParams = await algodClient.getTransactionParams().do();

  const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: config.account.addr,
    to: appAddress,
    amount: AlgoAmount.Algos(1).microAlgos,
    suggestedParams,
  });

  const optInTxn = algosdk.makeApplicationOptInTxnFromObject({
    from: config.account.addr,
    appIndex: appId,
    suggestedParams,
    foreignApps: [prevAppId],
  });

  const txns = [paymentTxn, optInTxn];
  const txnGroup = algosdk.assignGroupID(txns);

  const signedTxns = txnGroup.map((txn) => txn.signTxn(account.sk));
  const { txId } = await algodClient.sendRawTransaction(signedTxns).do();

  await algosdk.waitForConfirmation(algodClient, txId, 3);

  return {
    txId,
    appId,
    appAddress,
  };
}
