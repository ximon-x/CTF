import config from "../config";
import algosdk from "algosdk";

// Level 0: Just OptIn
// AppID: 724672936
// No prerequisites required, just OptIn to the application.

// Solution: Sender submits OptIn transaction to application ID.
export default async function l0() {
  const { account, algodClient } = config;

  const appId = 724672936;
  const suggestedParams = await algodClient.getTransactionParams().do();

  const txn = algosdk.makeApplicationOptInTxnFromObject({
    from: config.account.addr,
    appIndex: appId,
    suggestedParams,
  });

  const signedTxn = txn.signTxn(account.sk);
  const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
  await algosdk.waitForConfirmation(algodClient, txId, 3);

  return {
    txId,
    appId,
  };
}
