import config from "../config";
import algosdk from "algosdk";

import {
  AppClientCallCoreParams,
  AppDetails,
} from "@algorandfoundation/algokit-utils/types/app-client";
import { CoreAppCallArgs } from "@algorandfoundation/algokit-utils/types/app";
import { AlgoAmount } from "@algorandfoundation/algokit-utils/types/amount";
import { XimonClient } from "../dist/ximon.generated";

// Level 9: No Really, No Fees Allowed!
// AppID: 724673015

// The OptIn transaction must have a fee of 0 Algo, but must not be in a group larger than 1.

// Solution: Create a smart contract to perform an inner transactions on behalf of their account (rekey required) where fee is paid by outer transaction.

const myAppId = 728626753;

export default async function l9() {
  const { account, algodClient } = config;

  const appId = 724673015;
  const prevAppId = 724672975;
}
