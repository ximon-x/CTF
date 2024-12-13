import config from "../config";
import algosdk from "algosdk";

// Level 4: Authorized Personnel Only
// AppID: 724672950
// This application checks who has access to OptIn by comparing the sender's address with a global state value in a foreign app.

// Solution: Include a foreign application ID which has a global state "access" set to Senders address.

const myApp = 728733314;

export default async function l4() {
  const { account, algodClient } = config;

  const appId = 724672950;
  const prevAppId = 724672940;

  const appAddress = algosdk.getApplicationAddress(appId);
  const suggestedParams = await algodClient.getTransactionParams().do();

  const optInTxn = algosdk.makeApplicationOptInTxnFromObject({
    from: config.account.addr,
    appIndex: appId,
    suggestedParams,
    foreignApps: [prevAppId, myApp],
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
