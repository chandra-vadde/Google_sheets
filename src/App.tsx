import React from 'react';
import { Toolbar } from './components/Toolbar';
import { FormulaBar } from './components/FormulaBar';
import { Grid } from './components/Grid';

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Toolbar />
      <FormulaBar />
      <Grid />
    </div>
  );
}

export default App;