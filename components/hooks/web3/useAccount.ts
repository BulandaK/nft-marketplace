import { CryptoHookFactory } from "@/types/hook";
import useSWR from "swr";


type AccountHookFactory = CryptoHookFactory<string>;



export type UseAccountHook = ReturnType<AccountHookFactory>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hookFactory: AccountHookFactory = ({provider}) =>(params)=>{
    const swrRes =useSWR(
        provider? "web3/useAccount" : null,
        () =>{
            return "Test User"
        }
    )

    return swrRes
}


export const useAccount = hookFactory({ethereum: undefined,provider:undefined});