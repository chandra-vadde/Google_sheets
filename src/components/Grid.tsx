import React from 'react';
import { useSheetStore } from '../store/useSheetStore';
import { Cell } from './Cell';

const COLUMNS = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);
const ROWS = Array.from({ length: 100 }, (_, i) => i + 1);

export const Grid: React.FC = () => {
  const { columnWidths, rowHeights } = useSheetStore();

  return (
    <div className="overflow-auto flex-1">
      <div className="relative">
        {/* Header row */}
        <div className="sticky top-0 flex bg-gray-100">
          <div className="w-10 h-6 border-b border-r flex items-center justify-center bg-gray-200" />
          {COLUMNS.map((col) => (
            <div
              key={col}
              className="h-6 border-b border-r flex items-center justify-center bg-gray-200"
              style={{ width: columnWidths[col] || 100 }}
            >
              {col}
            </div>
          ))}
        </div>

        {/* Grid cells */}
        {ROWS.map((row) => (
          <div key={row} className="flex">
            <div
              className="sticky left-0 w-10 border-b border-r flex items-center justify-center bg-gray-200"
              style={{ height: rowHeights[row] || 24 }}
            >
              {row}
            </div>
            {COLUMNS.map((col) => (
              <Cell
                key={`${col}${row}`}
                id={`${col}${row}`}
                style={{
                  width: columnWidths[col] || 100,
                  height: rowHeights[row] || 24,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};