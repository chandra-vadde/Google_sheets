import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { SheetState, CellData } from '../types/sheet';
import { evaluateFormula } from '../utils/formulas';

interface SheetStore extends SheetState {
  setCellValue: (cellId: string, value: string) => void;
  setCellFormula: (cellId: string, formula: string) => void;
  setSelectedCell: (cellId: string | null) => void;
  setSelectedRange: (range: string[] | null) => void;
  updateCellStyle: (cellId: string, style: Partial<CellData['style']>) => void;
  setColumnWidth: (column: string, width: number) => void;
  setRowHeight: (row: number, height: number) => void;
}

const defaultCellStyle = {
  bold: false,
  italic: false,
  fontSize: 14,
  color: '#000000',
};

export const useSheetStore = create<SheetStore>()(
  immer((set) => ({
    data: {},
    selectedCell: null,
    selectedRange: null,
    columnWidths: {},
    rowHeights: {},

    setCellValue: (cellId, value) =>
      set((state) => {
        if (!state.data[cellId]) {
          state.data[cellId] = {
            value: '',
            formula: '',
            style: { ...defaultCellStyle },
          };
        }
        state.data[cellId].value = value;
      }),

    setCellFormula: (cellId, formula) =>
      set((state) => {
        if (!state.data[cellId]) {
          state.data[cellId] = {
            value: '',
            formula: '',
            style: { ...defaultCellStyle },
          };
        }
        state.data[cellId].formula = formula;
        state.data[cellId].value = evaluateFormula(formula, state.data);
      }),

    setSelectedCell: (cellId) =>
      set((state) => {
        state.selectedCell = cellId;
      }),

    setSelectedRange: (range) =>
      set((state) => {
        state.selectedRange = range;
      }),

    updateCellStyle: (cellId, style) =>
      set((state) => {
        if (!state.data[cellId]) {
          state.data[cellId] = {
            value: '',
            formula: '',
            style: { ...defaultCellStyle },
          };
        }
        state.data[cellId].style = { ...state.data[cellId].style, ...style };
      }),

    setColumnWidth: (column, width) =>
      set((state) => {
        state.columnWidths[column] = width;
      }),

    setRowHeight: (row, height) =>
      set((state) => {
        state.rowHeights[row] = height;
      }),
  })),
);