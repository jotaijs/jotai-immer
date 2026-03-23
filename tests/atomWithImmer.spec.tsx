import { afterEach, expect, test } from 'vitest';
import { StrictMode } from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { useAtom } from 'jotai/react';
import { createStore } from 'jotai/vanilla';
import { atomWithImmer } from 'jotai-immer';

afterEach(cleanup);

test('atomWithImmer with useAtom', async () => {
  const countAtom = atomWithImmer(0);

  const Parent = () => {
    const [count, setCount] = useAtom(countAtom);
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

test('atomWithImmer with WritableAtom<Value, Value> signature', async () => {
  const countAtom = atomWithImmer(0);

  const Parent = () => {
    const [count, setCount] = useAtom(countAtom);
    return (
      <>
        <div>count: {count}</div>
        <button onClick={() => setCount(count + 1)}>Increase</button>
        <button onClick={() => setCount(count - 1)}>Decrease</button>
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

test('atomWithImmer setting value to undefined resets the atom', async () => {
  const valueAtom = atomWithImmer<string | undefined>('hello');

  const Parent = () => {
    const [value, setValue] = useAtom(valueAtom);
    return (
      <>
        <div>value: {value ?? 'nothing'}</div>
        <button onClick={() => setValue(undefined)}>Clear</button>
        <button onClick={() => setValue('world')}>Set</button>
      </>
    );
  };

  const { findByText, getByText } = render(
    <StrictMode>
      <Parent />
    </StrictMode>,
  );

  await findByText('value: hello');

  fireEvent.click(getByText('Set'));
  await findByText('value: world');

  fireEvent.click(getByText('Clear'));
  await findByText('value: nothing');
});

test('atomWithImmer setting value to undefined via store.set', () => {
  const valueAtom = atomWithImmer<string | undefined>('hello');
  const store = createStore();

  expect(store.get(valueAtom)).toBe('hello');

  store.set(valueAtom, undefined);
  expect(store.get(valueAtom)).toBe(undefined);
});
