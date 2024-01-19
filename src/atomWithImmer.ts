import { produce } from 'immer'
import type { Draft } from 'immer'
import { atom } from 'jotai/vanilla'
import type { WritableAtom } from 'jotai/vanilla'

export function atomWithImmer<Value>(
  initialValue: Value
): WritableAtom<Value, [Value | ((draft: Draft<Value>) => void)], void> {
  return atom(
    initialValue,
    function (
      this: any,
      get,
      set,
      fn: Value | ((draft: Draft<Value>) => void)
    ) {
      set(
        this,
        produce(
          get(this),
          typeof fn === 'function'
            ? (fn as (draft: Draft<Value>) => void)
            : () => fn
        )
      )
    }
  )
}
