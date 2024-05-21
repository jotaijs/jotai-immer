import { atom } from 'jotai/vanilla';
import { useImmerAtom } from 'jotai-immer';

const primitiveAtom = atom(0);

const Counter = () => {
  const [count] = useImmerAtom(primitiveAtom);
  return <div>count: {count}</div>;
};

const Controls = () => {
  const [, setCount] = useImmerAtom(primitiveAtom);
  // setCount === update : (draft: Draft<Value>) => void
  const inc = () => setCount((c) => (c = c + 1));
  return <button onClick={inc}>+1</button>;
};

const App = () => (
  <div>
    <Counter />
    <Controls />
  </div>
);

export default App;
