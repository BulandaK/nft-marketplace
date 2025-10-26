import { CryptoHookFactory } from "@/types/hook";
import useSWR from "swr";


type AccountHookFactory = CryptoHookFactory<string,string>;



export type UseAccountHook = ReturnType<AccountHookFactory>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hookFactory: AccountHookFactory = (deps:any) =>(params:any)=>{
    const swrRes =useSWR("web3/useAccount",()=>{
       console.log(deps);
       console.log(params);
        return "test user"
    })

    return swrRes
}


export const useAccount = hookFactory({ethereum: undefined,provider:undefined});