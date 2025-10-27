import { CryptoHookFactory } from "@/types/hook";
import useSWR from "swr";


type AccountHookFactory = CryptoHookFactory<string>;



export type UseAccountHook = ReturnType<AccountHookFactory>

export const hookFactory: AccountHookFactory = ({provider}) =>()=>{
    const swrRes =useSWR(
        provider? "web3/useAccount" : null,
        async () =>{
            const accounts = await provider!.listAccounts()
            const account = accounts[0].address;

            if(!account){
                throw "Cannot retreive account! Please, connect to web3 wallet."
            }
            return account;
        },
        {
            revalidateOnFocus:false
        }
    )

    return swrRes
}


export const useAccount = hookFactory({ethereum: undefined,provider:undefined});