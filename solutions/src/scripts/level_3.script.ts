import { AlgoAmount } from "@algorandfoundation/algokit-utils/types/amount";
import config from "../config";
import algosdk from "algosdk";

// Level 3: More Opcode Budget
// AppID: 724672940
// This app uses a lot of opcode budget (>700), can you increase it to OptIn?

// Solution: Group of at least two application transactions.

export default async function l3() {
  const { account, algodClient } = config;

  const appId = 724672940;
  const prevAppId = 724672938;

  const appAddress = algosdk.getApplicationAddress(appId);
  const suggestedParams = await algodClient.getTransactionParams().do();

  const clearStateTxn = algosdk.makeApplicationClearStateTxnFromObject({
    from: config.account.addr,
    appIndex: prevAppId,
    suggestedParams,
  });

  const optInTxn = algosdk.makeApplicationOptInTxnFromObject({
    from: config.account.addr,
    appIndex: appId,
    suggestedParams,
    foreignApps: [prevAppId],
  });

  const txns = [optInTxn, clearStateTxn];
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
