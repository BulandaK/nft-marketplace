import { CryptoHookFactory } from '@/types/hook';
import useSWR from 'swr';

type UseAccountResponse = {
  connect: () => void;
};

type AccountHookFactory = CryptoHookFactory<string, UseAccountResponse>;

export type UseAccountHook = ReturnType<AccountHookFactory>;

export const hookFactory: AccountHookFactory =
  ({ provider, ethereum }) =>
  () => {
    const swrRes = useSWR(
      provider ? 'web3/useAccount' : null,
      async () => {
        const accounts = await provider!.listAccounts();
        const account = accounts[0].address;

        if (!account) {
          throw 'Cannot retreive account! Please, connect to web3 wallet.';
        }
        return account;
      },
      {
        revalidateOnFocus: false,
      }
    );

    const connect = async () => {
      try {
        console.log('wykonuje sie connect');
        ethereum?.request({ method: 'eth_requestAccounts' });
      } catch (e) {
        console.log(e);
      }
    };

    return {
      ...swrRes,
      connect,
    };
  };
