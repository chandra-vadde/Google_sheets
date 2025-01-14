export const evaluateFormula = (formula: string, data: any) => {
  if (!formula.startsWith('=')) return formula;

  const cleanFormula = formula.substring(1).toUpperCase();
  
  try {
    if (cleanFormula.startsWith('SUM(')) {
      return calculateSum(cleanFormula, data);
    } else if (cleanFormula.startsWith('AVERAGE(')) {
      return calculateAverage(cleanFormula, data);
    } else if (cleanFormula.startsWith('MAX(')) {
      return calculateMax(cleanFormula, data);
    } else if (cleanFormula.startsWith('MIN(')) {
      return calculateMin(cleanFormula, data);
    } else if (cleanFormula.startsWith('COUNT(')) {
      return calculateCount(cleanFormula, data);
    } else if (cleanFormula.startsWith('TRIM(')) {
      return applyTrim(cleanFormula, data);
    } else if (cleanFormula.startsWith('UPPER(')) {
      return applyUpper(cleanFormula, data);
    } else if (cleanFormula.startsWith('LOWER(')) {
      return applyLower(cleanFormula, data);
    }
  } catch (error) {
    return '#ERROR!';
  }

  return '#INVALID!';
};

const getCellValue = (cellId: string, data: any): number => {
  const value = data[cellId]?.value || '0';
  return parseFloat(value) || 0;
};

const getCellRange = (range: string): string[] => {
  // Parse range like "A1:B3"
  const [start, end] = range.split(':');
  if (!start || !end) return [range]; // Single cell reference

  const startCol = start.match(/[A-Z]+/)?.[0] || '';
  const startRow = parseInt(start.match(/\d+/)?.[0] || '0');
  const endCol = end.match(/[A-Z]+/)?.[0] || '';
  const endRow = parseInt(end.match(/\d+/)?.[0] || '0');

  const startColNum = startCol.split('').reduce((acc, char) => 
    acc * 26 + char.charCodeAt(0) - 64, 0);
  const endColNum = endCol.split('').reduce((acc, char) => 
    acc * 26 + char.charCodeAt(0) - 64, 0);

  const cells: string[] = [];
  for (let col = startColNum; col <= endColNum; col++) {
    for (let row = startRow; row <= endRow; row++) {
      const colStr = String.fromCharCode(64 + col);
      cells.push(`${colStr}${row}`);
    }
  }
  return cells;
};

const calculateSum = (formula: string, data: any): number => {
  const range = getCellRange(formula.slice(4, -1));
  return range.reduce((sum, cellId) => sum + getCellValue(cellId, data), 0);
};

const calculateAverage = (formula: string, data: any): number => {
  const range = getCellRange(formula.slice(8, -1));
  const sum = range.reduce((acc, cellId) => acc + getCellValue(cellId, data), 0);
  return sum / range.length;
};

const calculateMax = (formula: string, data: any): number => {
  const range = getCellRange(formula.slice(4, -1));
  return Math.max(...range.map(cellId => getCellValue(cellId, data)));
};

const calculateMin = (formula: string, data: any): number => {
  const range = getCellRange(formula.slice(4, -1));
  return Math.min(...range.map(cellId => getCellValue(cellId, data)));
};

const calculateCount = (formula: string, data: any): number => {
  const range = getCellRange(formula.slice(6, -1));
  return range.filter(cellId => !isNaN(getCellValue(cellId, data))).length;
};

const applyTrim = (formula: string, data: any): string => {
  const cellId = formula.slice(5, -1);
  return (data[cellId]?.value || '').trim();
};

const applyUpper = (formula: string, data: any): string => {
  const cellId = formula.slice(6, -1);
  return (data[cellId]?.value || '').toUpperCase();
};

const applyLower = (formula: string, data: any): string => {
  const cellId = formula.slice(6, -1);
  return (data[cellId]?.value || '').toLowerCase();
};