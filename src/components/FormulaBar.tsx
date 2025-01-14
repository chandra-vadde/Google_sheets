import React, { useState, useEffect } from 'react';
import { useSheetStore } from '../store/useSheetStore';

export const FormulaBar: React.FC = () => {
  const { selectedCell, data, setCellFormula } = useSheetStore();
  const [formula, setFormula] = useState('');

  useEffect(() => {
    if (selectedCell && data[selectedCell]) {
      setFormula(data[selectedCell].formula || data[selectedCell].value);
    } else {
      setFormula('');
    }
  }, [selectedCell, data]);

  const handleFormulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormula(e.target.value);
  };

  const handleFormulaSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && selectedCell) {
      setCellFormula(selectedCell, formula);
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 border-b bg-white">
      <div className="font-mono bg-gray-100 px-2 py-1 rounded">
        {selectedCell || ''}
      </div>
      <input
        type="text"
        value={formula}
        onChange={handleFormulaChange}
        onKeyDown={handleFormulaSubmit}
        className="flex-1 px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
        placeholder="Enter a value or formula"
      />
    </div>
  );
};