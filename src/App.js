import React, { useEffect } from 'react';
import Home from './components/Home';
import PureCounter from "@srexi/purecounterjs";

function App() {
  useEffect(() => {
    new PureCounter();
  }, []);
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;