import React from 'react'
import { atom, useAtom } from 'jotai'
import { withImmer } from 'jotai-immer'

const primitiveAtom = atom(0)
const countAtom = withImmer(primitiveAtom)

const Counter = () => {
  const [count] = useAtom(countAtom)
  return <div>count: {count}</div>
}

const Controls = () => {
  const [, setCount] = useAtom(countAtom)
  // setCount === update : (draft: Draft<Value>) => void
  const inc = () => setCount((c) => (c = c + 1))
  return <button onClick={inc}>+1</button>
}

const App = () => (
  <div>
    <Counter />
    <Controls />
  </div>
)

export default App
