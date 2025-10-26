import { CryptoHookFactory } from "@/types/hook";
import useSWR from "swr";

//deps -> provider, ethereum, conttract (web3State)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hookFactory: CryptoHookFactory = (deps:any) =>(params:any)=>{
    const swrRes =useSWR("web3/useAccount",()=>{
       console.log(deps);
       console.log(params);
        return "test user"
    })

    return swrRes
}


export const useAccount = hookFactory({ethereum: undefined,provider:undefined});