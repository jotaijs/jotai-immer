import type { Draft } from 'immer';
import { useAtomValue } from 'jotai/react';
import type { WritableAtom } from 'jotai/vanilla';

import { useSetImmerAtom } from './useSetImmerAtom.js';

type Options = Parameters<typeof useAtomValue>[1];

export function useImmerAtom<Value, Result>(
  anAtom: WritableAtom<Value, [(draft: Draft<Value>) => void], Result>,
  options?: Options,
): [Value, (fn: (draft: Draft<Value>) => void) => Result];

export function useImmerAtom<Value, Result>(
  anAtom: WritableAtom<Value, [(value: Value) => Value], Result>,
  options?: Options,
): [Value, (fn: (draft: Draft<Value>) => void) => Result];

export function useImmerAtom<Value, Result>(
  anAtom: WritableAtom<Value, [(value: Value) => Value], Result>,
  options?: Options,
) {
  return [useAtomValue(anAtom, options), useSetImmerAtom(anAtom, options)];
}
