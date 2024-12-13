import config from "../config";
import algosdk, { BoxReference } from "algosdk";

// Level 5: 3 Cups Game 7 Boxes Game
// AppID: 724672951
// This application contains multiple boxes (think of them as cups), within one of the boxes there is a ball. Include the box that contains the ball. Be aware that the ball moves!

// Solution: Include the correct box during the OptIn.

export default async function l5() {
  const { account, algodClient } = config;

  const appId = 724672951;
  const prevAppId = 724672950;

  const appAddress = algosdk.getApplicationAddress(appId);
  const suggestedParams = await algodClient.getTransactionParams().do();

  const boxesReponse = await algodClient.getApplicationBoxes(appId).do();
  const boxNames = boxesReponse.boxes.map((box) => box.name);

  let boxReference: BoxReference | undefined;

  await Promise.all(
    boxNames.map(async (boxName) => {
      const box = await algodClient
        .getApplicationBoxByName(appId, boxName)
        .do();

      if (new TextDecoder().decode(box.value) === "ball") {
        boxReference = {
          appIndex: appId,
          name: boxName,
        };
      }
    })
  );

  if (!boxReference) {
    throw new Error("No box contains the ball");
  }

  const optInTxn = algosdk.makeApplicationOptInTxnFromObject({
    suggestedParams,
    appIndex: appId,
    boxes: [boxReference],
    foreignApps: [prevAppId],
    from: config.account.addr,
    appArgs: [boxReference.name],
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
