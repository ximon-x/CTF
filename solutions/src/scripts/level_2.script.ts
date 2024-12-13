import { AlgoAmount } from "@algorandfoundation/algokit-utils/types/amount";
import config from "../config";
import algosdk from "algosdk";

// Level 2: No Fees Allowed
// AppID: 724672938
// The OptIn transaction must have a fee of 0 Algo.

// Solution: Group transaction where fee pooling covers the OptIn.

export default async function l2() {
  const { account, algodClient } = config;

  const appId = 724672938;
  const prevAppId = 724672937;

  const appAddress = algosdk.getApplicationAddress(appId);
  const suggestedParams = await algodClient.getTransactionParams().do();

  const minFee = algosdk.ALGORAND_MIN_TX_FEE;

  suggestedParams.fee = minFee * 3;
  suggestedParams.flatFee = true;

  const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: config.account.addr,
    to: appAddress,
    amount: AlgoAmount.Algos(1).microAlgos,
    suggestedParams,
  });

  const optInTxn = algosdk.makeApplicationOptInTxnFromObject({
    from: config.account.addr,
    appIndex: appId,
    suggestedParams: {
      ...suggestedParams,
      fee: 0,
    },
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
