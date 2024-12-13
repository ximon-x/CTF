import config from "../config";
import algosdk from "algosdk";

// Level 8: Access Token Required
// AppID: 724672975

// Only the account holding the special ASA can OptIn. Can you obtain it? Hint: The Clawback address.

// Solution: Group of two transactions, first to obtain the ASA, second to OptIn.

const myAppId = 728555382;
const logicSigProgram = "CTEgMgMSRDEVMgMSRDEQgQQSRDERgd7DxtkCEkQxAYEAEkSBAQ==";

export default async function l8() {
  const { account, algodClient } = config;

  const appId = 724672975;
  const prevAppId = 724672968;
  const assetID = 724672990;

  const clawbackAddress =
    "5MP27L7MSD35OVYU4UE27ONDUOATOL2BPKALR6EQ7ZAHUTJVXRIK5KIEYM";

  const currentAsaHolder =
    "UCSITEJ2UASBEA3ZLB6J5PEGI4GLHEVJVRM56U6SMD2FMLGBEBKTDNTWME";

  const appAddress = algosdk.getApplicationAddress(appId);
  const suggestedParams = await algodClient.getTransactionParams().do();

  const minFee = algosdk.ALGORAND_MIN_TX_FEE;

  const assetOptInTxn =
    algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: config.account.addr,
      suggestedParams,
      to: config.account.addr,
      amount: 0,
      assetIndex: assetID,
    });

  suggestedParams.fee = minFee * 3;
  suggestedParams.flatFee = true;

  const clawbackTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject(
    {
      from: clawbackAddress,
      to: account.addr,
      assetIndex: assetID,
      amount: 1,
      suggestedParams: {
        ...suggestedParams,
        fee: 0,
      },
      revocationTarget: currentAsaHolder,
    }
  );

  const optInTxn = algosdk.makeApplicationOptInTxnFromObject({
    appIndex: appId,
    foreignApps: [prevAppId, myAppId],
    from: config.account.addr,
    suggestedParams,
    foreignAssets: [assetID],
  });

  const txns = [assetOptInTxn, clawbackTxn, optInTxn];
  algosdk.assignGroupID(txns);

  const program = new Uint8Array(Buffer.from(logicSigProgram, "base64"));
  const lsig = new algosdk.LogicSigAccount(program);

  const signedClawbackTxn = algosdk.signLogicSigTransaction(
    clawbackTxn,
    lsig
  ).blob;

  const signedAssetOptInTxn = assetOptInTxn.signTxn(account.sk);
  const signedOptInTxn = optInTxn.signTxn(account.sk);
  const signedTxns = [signedAssetOptInTxn, signedClawbackTxn, signedOptInTxn];

  const { txId } = await algodClient.sendRawTransaction(signedTxns).do();
  await algosdk.waitForConfirmation(algodClient, txId, 3);

  return {
    txId,
    appId,
    appAddress,
  };
}
