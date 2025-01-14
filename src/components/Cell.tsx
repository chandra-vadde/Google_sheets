import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useSheetStore } from '../store/useSheetStore';

interface CellProps {
  id: string;
  style: React.CSSProperties;
}

export const Cell: React.FC<CellProps> = ({ id, style }) => {
  const {
    data,
    selectedCell,
    setCellValue,
    setSelectedCell,
  } = useSheetStore();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const cellData = data[id];
  const isSelected = selectedCell === id;

  useEffect(() => {
    if (cellData) {
      setValue(cellData.value);
    } else {
      setValue('');
    }
  }, [cellData]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
    if (value !== cellData?.value) {
      setCellValue(id, value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  return (
    <div
      className={clsx(
        'border-b border-r relative',
        isSelected && 'ring-2 ring-blue-500 z-10'
      )}
      style={style}
      onClick={() => setSelectedCell(id)}
      onDoubleClick={handleDoubleClick}
    >
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="absolute inset-0 w-full h-full px-1 border-none outline-none"
        />
      ) : (
        <div
          className={clsx(
            'w-full h-full px-1 overflow-hidden whitespace-nowrap',
            cellData?.style?.bold && 'font-bold',
            cellData?.style?.italic && 'italic'
          )}
          style={{
            fontSize: cellData?.style?.fontSize,
            color: cellData?.style?.color,
          }}
        >
          {cellData?.value || ''}
        </div>
      )}
    </div>
  );
};