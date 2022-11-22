import React, { StrictMode } from 'react'
import { fireEvent, render } from '@testing-library/react'
import { useAtom } from 'jotai/react'
import { atom } from 'jotai/vanilla'
import { withImmer } from '../src/index'

it('withImmer derived atom with useAtom', async () => {
  const regularCountAtom = atom(0)

  const Parent = () => {
    const [count, setCount] = useAtom(withImmer(regularCountAtom))
    return (
      <>
        <div>count: {count}</div>
        <button onClick={() => setCount((draft) => (draft = draft + 1))}>
          Increase
        </button>
        <button onClick={() => setCount((draft) => (draft = draft - 1))}>
          Decrease
        </button>
      </>
    )
  }

  const { findByText, getByText } = render(
    <StrictMode>
      <Parent />
    </StrictMode>
  )

  await findByText('count: 0')

  fireEvent.click(getByText('Increase'))
  await findByText('count: 1')

  fireEvent.click(getByText('Decrease'))
  await findByText('count: 0')
})

it('withImmer derived atom with WritableAtom<Value, Value> signature', async () => {
  const regularCountAtom = atom(0)

  const Parent = () => {
    const [count, setCount] = useAtom(withImmer(regularCountAtom))
    return (
      <>
        <div>count: {count}</div>
        <button onClick={() => setCount(count + 1)}>Increase</button>
        <button onClick={() => setCount(count - 1)}>Decrease</button>
      </>
    )
  }

  const { findByText, getByText } = render(
    <StrictMode>
      <Parent />
    </StrictMode>
  )

  await findByText('count: 0')

  fireEvent.click(getByText('Increase'))
  await findByText('count: 1')

  fireEvent.click(getByText('Decrease'))
  await findByText('count: 0')
})
