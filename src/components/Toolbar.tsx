import React from 'react';
import {
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Palette,
} from 'lucide-react';
import { useSheetStore } from '../store/useSheetStore';

export const Toolbar: React.FC = () => {
  const { selectedCell, updateCellStyle } = useSheetStore();

  const handleStyleChange = (style: any) => {
    if (selectedCell) {
      updateCellStyle(selectedCell, style);
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 border-b bg-white">
      <button
        className="p-1 hover:bg-gray-100 rounded"
        onClick={() => handleStyleChange({ bold: true })}
      >
        <Bold size={18} />
      </button>
      <button
        className="p-1 hover:bg-gray-100 rounded"
        onClick={() => handleStyleChange({ italic: true })}
      >
        <Italic size={18} />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-2" />
      <button className="p-1 hover:bg-gray-100 rounded">
        <AlignLeft size={18} />
      </button>
      <button className="p-1 hover:bg-gray-100 rounded">
        <AlignCenter size={18} />
      </button>
      <button className="p-1 hover:bg-gray-100 rounded">
        <AlignRight size={18} />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-2" />
      <button className="p-1 hover:bg-gray-100 rounded">
        <Type size={18} />
      </button>
      <button className="p-1 hover:bg-gray-100 rounded">
        <Palette size={18} />
      </button>
    </div>
  );
};