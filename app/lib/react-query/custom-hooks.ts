import {HTTPError} from 'ky';

import {
  MutationFunction,
  QueryFunction,
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

export type UseRQOptions<TData, TKey extends QueryKey = QueryKey, TError extends HTTPError = HTTPError> = Omit<
  UseQueryOptions<TData, TError, TData, TKey>,
  'queryKey' | 'queryFn'
>;

export type UseMQOptions<TData = unknown, TVariables = void, TError = unknown, TContext = unknown> = Omit<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  'mutationKey' | 'mutationFn'
>;

export const useRQ = <TData = unknown, TKey extends QueryKey = QueryKey, TError extends HTTPError = HTTPError>(
  queryKey: TKey,
  queryFn: QueryFunction<TData, TKey>,
  options?: UseRQOptions<TData, TKey, TError>,
) =>
  useQuery<TData, TError, TData, TKey>({
    queryKey,
    queryFn,
    ...options,
  });

export const useMQ = <
  TData = unknown,
  TKey extends QueryKey = QueryKey,
  TVariables = unknown,
  TError = unknown,
  TContext = unknown,
>(
  mutationKey: TKey,
  mutationFn: MutationFunction<TData, TVariables>,
  options?: UseMQOptions<TData, TVariables, TError, TContext>,
) =>
  useMutation<TData, TError, TVariables, TContext>({
    mutationKey,
    mutationFn,
    ...options,
  });
