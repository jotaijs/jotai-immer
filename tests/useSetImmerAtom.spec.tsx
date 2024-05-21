import { afterEach, test } from 'vitest';
import { StrictMode } from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { useAtomValue } from 'jotai/react';
import { atom } from 'jotai/vanilla';
import { atomWithImmer, useSetImmerAtom, withImmer } from 'jotai-immer';

afterEach(cleanup);

test('useSetImmerAtom with regular atom', async () => {
  const countAtom = atom(0);

  const Parent = () => {
    const count = useAtomValue(countAtom);
    const setCount = useSetImmerAtom(countAtom);
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
    );
  };

  const { findByText, getByText } = render(
    <StrictMode>
      <Parent />
    </StrictMode>,
  );

  await findByText('count: 0');

  fireEvent.click(getByText('Increase'));
  await findByText('count: 1');

  fireEvent.click(getByText('Decrease'));
  await findByText('count: 0');
});

test('useSetImmerAtom with immer atom', async () => {
  const countAtom = atomWithImmer(0);

  const Parent = () => {
    const count = useAtomValue(countAtom);
    const setCount = useSetImmerAtom(countAtom);
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
    );
  };

  const { findByText, getByText } = render(
    <StrictMode>
      <Parent />
    </StrictMode>,
  );

  await findByText('count: 0');

  fireEvent.click(getByText('Increase'));
  await findByText('count: 1');

  fireEvent.click(getByText('Decrease'));
  await findByText('count: 0');
});

test('useSetImmerAtom with derived immer atom', async () => {
  const regularCountAtom = atom(0);
  const countAtom = withImmer(regularCountAtom);

  const Parent = () => {
    const count = useAtomValue(countAtom);
    const setCount = useSetImmerAtom(countAtom);
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
    );
  };

  const { findByText, getByText } = render(
    <StrictMode>
      <Parent />
    </StrictMode>,
  );

  await findByText('count: 0');

  fireEvent.click(getByText('Increase'));
  await findByText('count: 1');

  fireEvent.click(getByText('Decrease'));
  await findByText('count: 0');
});
