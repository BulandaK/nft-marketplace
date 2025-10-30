import { CryptoHookFactory } from '@/types/hook';
import { useEffect } from 'react';
import useSWR from 'swr';

type UseAccountResponse = {
  connect: () => void;
  isLoading: boolean;
  isInstalled: boolean;
};

type AccountHookFactory = CryptoHookFactory<string, UseAccountResponse>;

export type UseAccountHook = ReturnType<AccountHookFactory>;

export const hookFactory: AccountHookFactory =
  ({ provider, ethereum, isLoading }) =>
  () => {
    const { data, mutate, isValidating, ...swr } = useSWR(
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
        shouldRetryOnError: false
      }
    );

    useEffect(() => {
      ethereum?.on('accountsChanged', handleAccountsChanged);
      return () => {
        ethereum?.removeListener('accountsChanged', handleAccountsChanged);
      };
    }, [ethereum]);

    const handleAccountsChanged = (...args: unknown[]) => {
      const accounts = args[0] as string[];
      if (accounts.length === 0) {
        console.error('Please, connect to Web3 wallet');
      } else if (accounts[0] !== data) {
        mutate(accounts[0]);
      }
    };

    const connect = async () => {
      try {
        console.log('wykonuje sie connect');
        await ethereum?.request({ method: 'eth_requestAccounts' });
        console.log('Connected successfully!');
      } catch (e) {
        console.log(e);
      }
    };

    return {
      ...swr,
      data,
      isValidating,
      isLoading: isLoading || isValidating,
      isInstalled: ethereum?.isMetaMask || false,
      mutate,
      connect,
    };
  };
