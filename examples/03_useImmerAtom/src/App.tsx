// Bugged.dev
import React from 'react'
import { Provider, atom, useAtom } from 'jotai'
import { atomWithImmer, useImmerAtom, withImmer } from 'jotai-immer'

const numAtom = atom(0) // regular atom
const derivedNumAtomImmer = withImmer(numAtom) // derived immer atom from regular atom
const numImmerAtom = atomWithImmer(0) // original immer atom
const Add = () => {
  const [derivedNum, setDerivedNum] = useAtom(derivedNumAtomImmer)
  const [num, setNum] = useAtom(numImmerAtom)
  const [toImmerNum, setToImmerNum] = useImmerAtom(numAtom) // replace the regular write function with new write function(similar to produce in immer)
  /*
  3 ways to have immer:

    atomWithImmer => useAtom or useImmerAtom
          Performance -> useAtom > useImmerAtom
    withImmer => useAtom or useImmerAtom
          Performace -> useAtom > useImmerAtom
    atom => useImmerAtom
          Performance -> useAtom == useImmerAtom

  */
  return (
    <div>
      derived immer atom - number: {derivedNum}
      <button onClick={() => setDerivedNum((draft) => (draft = draft + 1))}>
        +
      </button>
      <br />
      original immer atom - number: {num}
      <button onClick={() => setNum((draft) => (draft = draft + 1))}>+</button>
      <br />
      derived immer atom(useImmerAtom): {toImmerNum}
      <button onClick={() => setToImmerNum((draft) => (draft = draft + 1))}>
        +
      </button>
    </div>
  )
}
const App = () => (
  <Provider>
    <Add />
  </Provider>
)

export default App
