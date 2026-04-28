import { useStore } from '@shared/store/useStore';
import { PianoKeyboard } from '@widgets/piano-keyboard';

import './App.css';

function App() {
  const keyboardSize = useStore((s) => s.keyboardSize);

  return (
    <div className="app">
      <h1 className="app__title">🎹 Piano Map</h1>

      <div className="app__keyboard">
        <PianoKeyboard keyboardSize={keyboardSize} />
      </div>
    </div>
  );
}

export default App;
