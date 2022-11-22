import React from 'react'
import { atomWithImmer } from 'jotai-immer'
import { useAtom } from 'jotai/react'

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
