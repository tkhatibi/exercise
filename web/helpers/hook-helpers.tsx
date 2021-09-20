import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState as useNormalState,
} from 'react';
import cps from 'use-persisted-state';

export type ProviderProps = {
  children: ReactNode | ReactNode[];
};

export function createPersistedState<State>(name: string, initialState: State) {
  const usePersistedState = cps(name);

  const context =
    // @ts-ignore
    createContext<[State, Dispatch<SetStateAction<State>>]>(undefined);

  function Provider({ children }: ProviderProps) {
    return (
      <context.Provider value={usePersistedState(initialState)}>
        {children}
      </context.Provider>
    );
  }

  function _usePersistedState() {
    return useContext(context);
  }

  return {
    Provider,
    usePersistedState: _usePersistedState,
  };
}

export function createGlobalState<State>(initialState: State) {
  const context =
    // @ts-ignore
    createContext<[State, Dispatch<SetStateAction<State>>]>(undefined);

  function Provider({ children }: ProviderProps) {
    return (
      <context.Provider value={useNormalState(initialState)}>
        {children}
      </context.Provider>
    );
  }

  function useGlobalState() {
    return useContext(context);
  }

  return {
    Provider,
    useGlobalState,
  };
}
