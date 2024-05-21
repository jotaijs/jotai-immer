import { useCallback } from 'react';
import { produce } from 'immer';
import type { Draft } from 'immer';
import { useSetAtom } from 'jotai/react';
import type { WritableAtom } from 'jotai/vanilla';

type Options = Parameters<typeof useSetAtom>[1];

export function useSetImmerAtom<Value, Result>(
  anAtom: WritableAtom<Value, [(draft: Draft<Value>) => void], Result>,
  options?: Options,
): (fn: (draft: Draft<Value>) => void) => Result;

export function useSetImmerAtom<Value, Result>(
  anAtom: WritableAtom<Value, [(value: Value) => Value], Result>,
  options?: Options,
): (fn: (draft: Draft<Value>) => void) => Result;

export function useSetImmerAtom<Value, Result>(
  anAtom: WritableAtom<Value, [(value: Value) => Value], Result>,
  options?: Options,
) {
  const setState = useSetAtom(anAtom, options);
  return useCallback(
    (fn: (draft: Draft<Value>) => void) => setState(produce(fn)),
    [setState],
  );
}
