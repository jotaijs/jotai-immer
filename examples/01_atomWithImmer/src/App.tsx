import React from 'react'
import { useAtom } from 'jotai/react'
import { atomWithImmer } from 'jotai-immer'

const counterAtom = atomWithImmer(0) // original immer atom

const Add = () => {
  const [counter, setCounter] = useAtom(counterAtom)
  return (
    <div>
      counter: {counter}
      <button onClick={() => setCounter((draft) => (draft = draft + 1))}>
        +
      </button>
    </div>
  )
}

const App = () => (
  <div>
    <Add />
  </div>
)

export default App
