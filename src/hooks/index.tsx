/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type QueryObserverSuccessResult,
  queryOptions,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import type React from "react";
import { createContext, useContext } from "react";
import { supabase } from "~/server/supabase";

const APP_KEY = () => ["APP"];

type Filters = {
  id: string;
};

const queries = {
  accounts: () => [...APP_KEY(), "ACCOUNTS"],
  account: ({ id }: Filters) =>
    queryOptions({
      queryKey: [...queries.accounts(), { id }],
      enabled: true,
      queryFn: async () =>
        (
          await supabase
            .from("Account")
            .select()
            .eq("id", "asdoin")
            .single()
            .throwOnError()
        ).data,
    }),
};

type CreateQueryContext<T> = T extends (...args: any[]) => UseQueryOptions<
  any,
  any,
  infer R,
  any[]
> & {
  initialData?: any;
} & {
  queryKey: any;
}
  ? QueryObserverSuccessResult<R, Error> | undefined
  : never;

const AccountsContext =
  createContext<CreateQueryContext<typeof queries.account>>(undefined);

const AccountsProvider = (
  props: React.PropsWithChildren<{
    filters: Filters;
    suspense?: React.ReactElement;
    error?: React.ReactElement;
  }>,
) => {
  const query = useQuery(queries.account(props.filters));

  if (query.status === "error") return props?.error ?? <>Error</>;

  if (query.status === "pending") return props?.suspense ?? <>Loading</>;

  return (
    <AccountsContext.Provider value={query}>
      {props.children ?? <></>}
    </AccountsContext.Provider>
  );
};

const useAccounts = () => {
  const value = useContext(AccountsContext);
  if (!value) throw Error("AccountsProvider required");
  return value;
};

export { AccountsProvider, useAccounts };
