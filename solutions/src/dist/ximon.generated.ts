/* eslint-disable */
// @ts-nocheck
/**
 * This file was automatically generated by @algorandfoundation/algokit-client-generator.
 * DO NOT MODIFY IT BY HAND.
 * requires: @algorandfoundation/algokit-utils: ^2
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import type {
  ABIAppCallArg,
  AppCallTransactionResult,
  AppCallTransactionResultOfType,
  AppCompilationResult,
  AppReference,
  AppState,
  AppStorageSchema,
  CoreAppCallArgs,
  RawAppCallArgs,
  TealTemplateParams,
} from '@algorandfoundation/algokit-utils/types/app'
import type {
  AppClientCallCoreParams,
  AppClientCompilationParams,
  AppClientDeployCoreParams,
  AppDetails,
  ApplicationClient,
} from '@algorandfoundation/algokit-utils/types/app-client'
import type { AppSpec } from '@algorandfoundation/algokit-utils/types/app-spec'
import type { SendTransactionResult, TransactionToSign, SendTransactionFrom, SendTransactionParams } from '@algorandfoundation/algokit-utils/types/transaction'
import type { ABIResult, TransactionWithSigner } from 'algosdk'
import { Algodv2, OnApplicationComplete, Transaction, AtomicTransactionComposer, modelsv2 } from 'algosdk'
export const APP_SPEC: AppSpec = {
  "hints": {
    "sum(uint64,uint64)uint64": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "call_authorize()void": {
      "call_config": {
        "no_op": "CALL"
      }
    }
  },
  "source": {
    "approval": "I3ByYWdtYSB2ZXJzaW9uIDEwCgpzbWFydF9jb250cmFjdHMueGltb24uY29udHJhY3QuWGltb24uYXBwcm92YWxfcHJvZ3JhbToKICAgIGludGNibG9jayAwIDEKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBibnogbWFpbl9hZnRlcl9pZl9lbHNlQDIKICAgIGNhbGxzdWIgX19pbml0X18KCm1haW5fYWZ0ZXJfaWZfZWxzZUAyOgogICAgY2FsbHN1YiBfX3B1eWFfYXJjNF9yb3V0ZXJfXwogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzLnhpbW9uLmNvbnRyYWN0LlhpbW9uLl9faW5pdF9fKCkgLT4gdm9pZDoKX19pbml0X186CiAgICBwcm90byAwIDAKICAgIHB1c2hieXRlcyAiYWNjZXNzIgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzLnhpbW9uLmNvbnRyYWN0LlhpbW9uLl9fcHV5YV9hcmM0X3JvdXRlcl9fKCkgLT4gdWludDY0OgpfX3B1eWFfYXJjNF9yb3V0ZXJfXzoKICAgIHByb3RvIDAgMQogICAgdHhuIE51bUFwcEFyZ3MKICAgIGJ6IF9fcHV5YV9hcmM0X3JvdXRlcl9fX2JhcmVfcm91dGluZ0A2CiAgICBwdXNoYnl0ZXNzIDB4NzA1ZGQxZmYgMHgwZDZkN2FiZSAvLyBtZXRob2QgInN1bSh1aW50NjQsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAiY2FsbF9hdXRob3JpemUoKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBfX3B1eWFfYXJjNF9yb3V0ZXJfX19zdW1fcm91dGVAMiBfX3B1eWFfYXJjNF9yb3V0ZXJfX19jYWxsX2F1dGhvcml6ZV9yb3V0ZUAzCiAgICBpbnRjXzAgLy8gMAogICAgcmV0c3ViCgpfX3B1eWFfYXJjNF9yb3V0ZXJfX19zdW1fcm91dGVAMjoKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydCAvLyBPbkNvbXBsZXRpb24gaXMgTm9PcAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGFzc2VydCAvLyBpcyBub3QgY3JlYXRpbmcKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGNhbGxzdWIgc3VtCiAgICBwdXNoYnl0ZXMgMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXRzdWIKCl9fcHV5YV9hcmM0X3JvdXRlcl9fX2NhbGxfYXV0aG9yaXplX3JvdXRlQDM6CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQgLy8gT25Db21wbGV0aW9uIGlzIE5vT3AKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBhc3NlcnQgLy8gaXMgbm90IGNyZWF0aW5nCiAgICBjYWxsc3ViIGNhbGxfYXV0aG9yaXplCiAgICBpbnRjXzEgLy8gMQogICAgcmV0c3ViCgpfX3B1eWFfYXJjNF9yb3V0ZXJfX19iYXJlX3JvdXRpbmdANjoKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIGJueiBfX3B1eWFfYXJjNF9yb3V0ZXJfX19hZnRlcl9pZl9lbHNlQDEwCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgIQogICAgYXNzZXJ0IC8vIGlzIGNyZWF0aW5nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0c3ViCgpfX3B1eWFfYXJjNF9yb3V0ZXJfX19hZnRlcl9pZl9lbHNlQDEwOgogICAgaW50Y18wIC8vIDAKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy54aW1vbi5jb250cmFjdC5YaW1vbi5zdW0oYTogYnl0ZXMsIGI6IGJ5dGVzKSAtPiBieXRlczoKc3VtOgogICAgcHJvdG8gMiAxCiAgICBmcmFtZV9kaWcgLTIKICAgIGJ0b2kKICAgIGZyYW1lX2RpZyAtMQogICAgYnRvaQogICAgKwogICAgaXRvYgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzLnhpbW9uLmNvbnRyYWN0LlhpbW9uLmNhbGxfYXV0aG9yaXplKCkgLT4gdm9pZDoKY2FsbF9hdXRob3JpemU6CiAgICBwcm90byAwIDAKICAgIGl0eG5fYmVnaW4KICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgcHVzaGludCA3MjQ2NzI5NjggLy8gNzI0NjcyOTY4CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDczYmM2NTAxIC8vIG1ldGhvZCAiYXV0aG9yaXplKGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIHJldHN1Ygo=",
    "clear": "I3ByYWdtYSB2ZXJzaW9uIDEwCgpzbWFydF9jb250cmFjdHMueGltb24uY29udHJhY3QuWGltb24uY2xlYXJfc3RhdGVfcHJvZ3JhbToKICAgIHB1c2hpbnQgMSAvLyAxCiAgICByZXR1cm4K"
  },
  "state": {
    "global": {
      "num_byte_slices": 1,
      "num_uints": 0
    },
    "local": {
      "num_byte_slices": 0,
      "num_uints": 0
    }
  },
  "schema": {
    "global": {
      "declared": {
        "access": {
          "type": "bytes",
          "key": "access"
        }
      },
      "reserved": {}
    },
    "local": {
      "declared": {},
      "reserved": {}
    }
  },
  "contract": {
    "name": "Ximon",
    "methods": [
      {
        "name": "sum",
        "args": [
          {
            "type": "uint64",
            "name": "a"
          },
          {
            "type": "uint64",
            "name": "b"
          }
        ],
        "readonly": false,
        "returns": {
          "type": "uint64"
        }
      },
      {
        "name": "call_authorize",
        "args": [],
        "readonly": false,
        "returns": {
          "type": "void"
        }
      }
    ],
    "networks": {}
  },
  "bare_call_config": {
    "no_op": "CREATE"
  }
}

/**
 * Defines an onCompletionAction of 'no_op'
 */
export type OnCompleteNoOp =  { onCompleteAction?: 'no_op' | OnApplicationComplete.NoOpOC }
/**
 * Defines an onCompletionAction of 'opt_in'
 */
export type OnCompleteOptIn =  { onCompleteAction: 'opt_in' | OnApplicationComplete.OptInOC }
/**
 * Defines an onCompletionAction of 'close_out'
 */
export type OnCompleteCloseOut =  { onCompleteAction: 'close_out' | OnApplicationComplete.CloseOutOC }
/**
 * Defines an onCompletionAction of 'delete_application'
 */
export type OnCompleteDelApp =  { onCompleteAction: 'delete_application' | OnApplicationComplete.DeleteApplicationOC }
/**
 * Defines an onCompletionAction of 'update_application'
 */
export type OnCompleteUpdApp =  { onCompleteAction: 'update_application' | OnApplicationComplete.UpdateApplicationOC }
/**
 * A state record containing a single unsigned integer
 */
export type IntegerState = {
  /**
   * Gets the state value as a BigInt.
   */
  asBigInt(): bigint
  /**
   * Gets the state value as a number.
   */
  asNumber(): number
}
/**
 * A state record containing binary data
 */
export type BinaryState = {
  /**
   * Gets the state value as a Uint8Array
   */
  asByteArray(): Uint8Array
  /**
   * Gets the state value as a string
   */
  asString(): string
}

export type AppCreateCallTransactionResult = AppCallTransactionResult & Partial<AppCompilationResult> & AppReference
export type AppUpdateCallTransactionResult = AppCallTransactionResult & Partial<AppCompilationResult>

export type AppClientComposeCallCoreParams = Omit<AppClientCallCoreParams, 'sendParams'> & {
  sendParams?: Omit<SendTransactionParams, 'skipSending' | 'atc' | 'skipWaiting' | 'maxRoundsToWaitForConfirmation' | 'populateAppCallResources'>
}
export type AppClientComposeExecuteParams = Pick<SendTransactionParams, 'skipWaiting' | 'maxRoundsToWaitForConfirmation' | 'populateAppCallResources' | 'suppressLog'>

export type IncludeSchema = {
  /**
   * Any overrides for the storage schema to request for the created app; by default the schema indicated by the app spec is used.
   */
  schema?: Partial<AppStorageSchema>
}

/**
 * Defines the types of available calls and state of the Ximon smart contract.
 */
export type Ximon = {
  /**
   * Maps method signatures / names to their argument and return types.
   */
  methods:
    & Record<'sum(uint64,uint64)uint64' | 'sum', {
      argsObj: {
        a: bigint | number
        b: bigint | number
      }
      argsTuple: [a: bigint | number, b: bigint | number]
      returns: bigint
    }>
    & Record<'call_authorize()void' | 'call_authorize', {
      argsObj: {
      }
      argsTuple: []
      returns: void
    }>
  /**
   * Defines the shape of the global and local state of the application.
   */
  state: {
    global: {
      access?: BinaryState
    }
  }
}
/**
 * Defines the possible abi call signatures
 */
export type XimonSig = keyof Ximon['methods']
/**
 * Defines an object containing all relevant parameters for a single call to the contract. Where TSignature is undefined, a bare call is made
 */
export type TypedCallParams<TSignature extends XimonSig | undefined> = {
  method: TSignature
  methodArgs: TSignature extends undefined ? undefined : Array<ABIAppCallArg | undefined>
} & AppClientCallCoreParams & CoreAppCallArgs
/**
 * Defines the arguments required for a bare call
 */
export type BareCallArgs = Omit<RawAppCallArgs, keyof CoreAppCallArgs>
/**
 * Maps a method signature from the Ximon smart contract to the method's arguments in either tuple of struct form
 */
export type MethodArgs<TSignature extends XimonSig> = Ximon['methods'][TSignature]['argsObj' | 'argsTuple']
/**
 * Maps a method signature from the Ximon smart contract to the method's return type
 */
export type MethodReturn<TSignature extends XimonSig> = Ximon['methods'][TSignature]['returns']

/**
 * A factory for available 'create' calls
 */
export type XimonCreateCalls = (typeof XimonCallFactory)['create']
/**
 * Defines supported create methods for this smart contract
 */
export type XimonCreateCallParams =
  | (TypedCallParams<undefined> & (OnCompleteNoOp))
/**
 * Defines arguments required for the deploy method.
 */
export type XimonDeployArgs = {
  deployTimeParams?: TealTemplateParams
  /**
   * A delegate which takes a create call factory and returns the create call params for this smart contract
   */
  createCall?: (callFactory: XimonCreateCalls) => XimonCreateCallParams
}


/**
 * Exposes methods for constructing all available smart contract calls
 */
export abstract class XimonCallFactory {
  /**
   * Gets available create call factories
   */
  static get create() {
    return {
      /**
       * Constructs a create call for the Ximon smart contract using a bare call
       *
       * @param params Any parameters for the call
       * @returns A TypedCallParams object for the call
       */
      bare(params: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs & AppClientCompilationParams & (OnCompleteNoOp) = {}) {
        return {
          method: undefined,
          methodArgs: undefined,
          ...params,
        }
      },
    }
  }

  /**
   * Constructs a no op call for the sum(uint64,uint64)uint64 ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static sum(args: MethodArgs<'sum(uint64,uint64)uint64'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'sum(uint64,uint64)uint64' as const,
      methodArgs: Array.isArray(args) ? args : [args.a, args.b],
      ...params,
    }
  }
  /**
   * Constructs a no op call for the call_authorize()void ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static callAuthorize(args: MethodArgs<'call_authorize()void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'call_authorize()void' as const,
      methodArgs: Array.isArray(args) ? args : [],
      ...params,
    }
  }
}

/**
 * A client to make calls to the Ximon smart contract
 */
export class XimonClient {
  /**
   * The underlying `ApplicationClient` for when you want to have more flexibility
   */
  public readonly appClient: ApplicationClient

  private readonly sender: SendTransactionFrom | undefined

  /**
   * Creates a new instance of `XimonClient`
   *
   * @param appDetails appDetails The details to identify the app to deploy
   * @param algod An algod client instance
   */
  constructor(appDetails: AppDetails, private algod: Algodv2) {
    this.sender = appDetails.sender
    this.appClient = algokit.getAppClient({
      ...appDetails,
      app: APP_SPEC
    }, algod)
  }

  /**
   * Checks for decode errors on the AppCallTransactionResult and maps the return value to the specified generic type
   *
   * @param result The AppCallTransactionResult to be mapped
   * @param returnValueFormatter An optional delegate to format the return value if required
   * @returns The smart contract response with an updated return value
   */
  protected mapReturnValue<TReturn, TResult extends AppCallTransactionResult = AppCallTransactionResult>(result: AppCallTransactionResult, returnValueFormatter?: (value: any) => TReturn): AppCallTransactionResultOfType<TReturn> & TResult {
    if(result.return?.decodeError) {
      throw result.return.decodeError
    }
    const returnValue = result.return?.returnValue !== undefined && returnValueFormatter !== undefined
      ? returnValueFormatter(result.return.returnValue)
      : result.return?.returnValue as TReturn | undefined
      return { ...result, return: returnValue } as AppCallTransactionResultOfType<TReturn> & TResult
  }

  /**
   * Calls the ABI method with the matching signature using an onCompletion code of NO_OP
   *
   * @param typedCallParams An object containing the method signature, args, and any other relevant parameters
   * @param returnValueFormatter An optional delegate which when provided will be used to map non-undefined return values to the target type
   * @returns The result of the smart contract call
   */
  public async call<TSignature extends keyof Ximon['methods']>(typedCallParams: TypedCallParams<TSignature>, returnValueFormatter?: (value: any) => MethodReturn<TSignature>) {
    return this.mapReturnValue<MethodReturn<TSignature>>(await this.appClient.call(typedCallParams), returnValueFormatter)
  }

  /**
   * Idempotently deploys the Ximon smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  public deploy(params: XimonDeployArgs & AppClientDeployCoreParams & IncludeSchema = {}): ReturnType<ApplicationClient['deploy']> {
    const createArgs = params.createCall?.(XimonCallFactory.create)
    return this.appClient.deploy({
      ...params,
      createArgs,
      createOnCompleteAction: createArgs?.onCompleteAction,
    })
  }

  /**
   * Gets available create methods
   */
  public get create() {
    const $this = this
    return {
      /**
       * Creates a new instance of the Ximon smart contract using a bare call.
       *
       * @param args The arguments for the bare call
       * @returns The create result
       */
      async bare(args: BareCallArgs & AppClientCallCoreParams & AppClientCompilationParams & IncludeSchema & CoreAppCallArgs & (OnCompleteNoOp) = {}) {
        return $this.mapReturnValue<undefined, AppCreateCallTransactionResult>(await $this.appClient.create(args))
      },
    }
  }

  /**
   * Makes a clear_state call to an existing instance of the Ximon smart contract.
   *
   * @param args The arguments for the bare call
   * @returns The clear_state result
   */
  public clearState(args: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.appClient.clearState(args)
  }

  /**
   * Calls the sum(uint64,uint64)uint64 ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public sum(args: MethodArgs<'sum(uint64,uint64)uint64'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(XimonCallFactory.sum(args, params))
  }

  /**
   * Calls the call_authorize()void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public callAuthorize(args: MethodArgs<'call_authorize()void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(XimonCallFactory.callAuthorize(args, params))
  }

  /**
   * Extracts a binary state value out of an AppState dictionary
   *
   * @param state The state dictionary containing the state value
   * @param key The key of the state value
   * @returns A BinaryState instance containing the state value, or undefined if the key was not found
   */
  private static getBinaryState(state: AppState, key: string): BinaryState | undefined {
    const value = state[key]
    if (!value) return undefined
    if (!('valueRaw' in value))
      throw new Error(`Failed to parse state value for ${key}; received an int when expected a byte array`)
    return {
      asString(): string {
        return value.value
      },
      asByteArray(): Uint8Array {
        return value.valueRaw
      }
    }
  }

  /**
   * Extracts a integer state value out of an AppState dictionary
   *
   * @param state The state dictionary containing the state value
   * @param key The key of the state value
   * @returns An IntegerState instance containing the state value, or undefined if the key was not found
   */
  private static getIntegerState(state: AppState, key: string): IntegerState | undefined {
    const value = state[key]
    if (!value) return undefined
    if ('valueRaw' in value)
      throw new Error(`Failed to parse state value for ${key}; received a byte array when expected a number`)
    return {
      asBigInt() {
        return typeof value.value === 'bigint' ? value.value : BigInt(value.value)
      },
      asNumber(): number {
        return typeof value.value === 'bigint' ? Number(value.value) : value.value
      },
    }
  }

  /**
   * Returns the smart contract's global state wrapped in a strongly typed accessor with options to format the stored value
   */
  public async getGlobalState(): Promise<Ximon['state']['global']> {
    const state = await this.appClient.getGlobalState()
    return {
      get access() {
        return XimonClient.getBinaryState(state, 'access')
      },
    }
  }

  public compose(): XimonComposer {
    const client = this
    const atc = new AtomicTransactionComposer()
    let promiseChain:Promise<unknown> = Promise.resolve()
    const resultMappers: Array<undefined | ((x: any) => any)> = []
    return {
      sum(args: MethodArgs<'sum(uint64,uint64)uint64'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.sum(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      callAuthorize(args: MethodArgs<'call_authorize()void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.callAuthorize(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      clearState(args?: BareCallArgs & AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.clearState({...args, sendParams: {...args?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      addTransaction(txn: TransactionWithSigner | TransactionToSign | Transaction | Promise<SendTransactionResult>, defaultSender?: SendTransactionFrom) {
        promiseChain = promiseChain.then(async () => atc.addTransaction(await algokit.getTransactionWithSigner(txn, defaultSender ?? client.sender)))
        return this
      },
      async atc() {
        await promiseChain
        return atc
      },
      async simulate(options?: SimulateOptions) {
        await promiseChain
        const result = await atc.simulate(client.algod, new modelsv2.SimulateRequest({ txnGroups: [], ...options }))
        return {
          ...result,
          returns: result.methodResults?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i]!(val.returnValue) : val.returnValue)
        }
      },
      async execute(sendParams?: AppClientComposeExecuteParams) {
        await promiseChain
        const result = await algokit.sendAtomicTransactionComposer({ atc, sendParams }, client.algod)
        return {
          ...result,
          returns: result.returns?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i]!(val.returnValue) : val.returnValue)
        }
      }
    } as unknown as XimonComposer
  }
}
export type XimonComposer<TReturns extends [...any[]] = []> = {
  /**
   * Calls the sum(uint64,uint64)uint64 ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  sum(args: MethodArgs<'sum(uint64,uint64)uint64'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): XimonComposer<[...TReturns, MethodReturn<'sum(uint64,uint64)uint64'>]>

  /**
   * Calls the call_authorize()void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  callAuthorize(args: MethodArgs<'call_authorize()void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): XimonComposer<[...TReturns, MethodReturn<'call_authorize()void'>]>

  /**
   * Makes a clear_state call to an existing instance of the Ximon smart contract.
   *
   * @param args The arguments for the bare call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  clearState(args?: BareCallArgs & AppClientComposeCallCoreParams & CoreAppCallArgs): XimonComposer<[...TReturns, undefined]>

  /**
   * Adds a transaction to the composer
   *
   * @param txn One of: A TransactionWithSigner object (returned as is), a TransactionToSign object (signer is obtained from the signer property), a Transaction object (signer is extracted from the defaultSender parameter), an async SendTransactionResult returned by one of algokit utils helpers (signer is obtained from the defaultSender parameter)
   * @param defaultSender The default sender to be used to obtain a signer where the object provided to the transaction parameter does not include a signer.
   */
  addTransaction(txn: TransactionWithSigner | TransactionToSign | Transaction | Promise<SendTransactionResult>, defaultSender?: SendTransactionFrom): XimonComposer<TReturns>
  /**
   * Returns the underlying AtomicTransactionComposer instance
   */
  atc(): Promise<AtomicTransactionComposer>
  /**
   * Simulates the transaction group and returns the result
   */
  simulate(options?: SimulateOptions): Promise<XimonComposerSimulateResult<TReturns>>
  /**
   * Executes the transaction group and returns the results
   */
  execute(sendParams?: AppClientComposeExecuteParams): Promise<XimonComposerResults<TReturns>>
}
export type SimulateOptions = Omit<ConstructorParameters<typeof modelsv2.SimulateRequest>[0], 'txnGroups'>
export type XimonComposerSimulateResult<TReturns extends [...any[]]> = {
  returns: TReturns
  methodResults: ABIResult[]
  simulateResponse: modelsv2.SimulateResponse
}
export type XimonComposerResults<TReturns extends [...any[]]> = {
  returns: TReturns
  groupId: string
  txIds: string[]
  transactions: Transaction[]
}
