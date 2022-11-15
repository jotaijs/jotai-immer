import { produce } from 'immer'
import type { Draft } from 'immer'
import { atom } from 'jotai'
import type { PrimitiveAtom, WritableAtom } from 'jotai'

const cache = new WeakMap()
const memoize = <T>(create: () => T, dep: object): T => {
  if (!cache.has(dep)) {
    cache.set(dep, create())
  }
  return cache.get(dep)
}

export function withImmer<Value>(
  anAtom: PrimitiveAtom<Value>
): WritableAtom<Value, Value | ((draft: Draft<Value>) => void)>

export function withImmer<Value>(
  anAtom: WritableAtom<Value, Value>
): WritableAtom<Value, Value | ((draft: Draft<Value>) => void)>

export function withImmer<Value>(anAtom: WritableAtom<Value, Value>) {
  return memoize(() => {
    const derivedAtom = atom(
      (get) => get(anAtom),
      (get, set, fn: Value | ((draft: Draft<Value>) => void)) =>
        set(
          anAtom,
          produce(
            get(anAtom),
            typeof fn === 'function'
              ? (fn as (draft: Draft<Value>) => void)
              : () => fn
          )
        )
    )
    return derivedAtom
  }, anAtom)
}
