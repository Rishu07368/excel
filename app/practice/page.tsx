"use client";

import { useState, useCallback } from "react";
import { 
  Play,
  RotateCcw,
  Copy,
  Check,
  Calculator,
  Grid3X3,
  Type,
  Hash,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { cn } from "@/lib/utils";

interface Cell {
  value: string;
  formula: string;
  isFormula: boolean;
}

const GRID_COLS = 10;
const GRID_ROWS = 20;
const COLUMNS = Array.from({ length: GRID_COLS }, (_, i) => String.fromCharCode(65 + i)); // A-J

export default function PracticePage() {
  const [cells, setCells] = useState<Record<string, Cell>>(() => {
    // Initialize with some sample data
    const initial: Record<string, Cell> = {};
    
    // Sample data
    initial["A1"] = { value: "Product", formula: "", isFormula: false };
    initial["B1"] = { value: "Quantity", formula: "", isFormula: false };
    initial["C1"] = { value: "Price", formula: "", isFormula: false };
    initial["D1"] = { value: "Total", formula: "", isFormula: false };
    
    initial["A2"] = { value: "Apple", formula: "", isFormula: false };
    initial["B2"] = { value: "10", formula: "", isFormula: false };
    initial["C2"] = { value: "1.50", formula: "", isFormula: false };
    initial["D2"] = { value: "", formula: "=B2*C2", isFormula: true };
    
    initial["A3"] = { value: "Banana", formula: "", isFormula: false };
    initial["B3"] = { value: "25", formula: "", isFormula: false };
    initial["C3"] = { value: "0.75", formula: "", isFormula: false };
    initial["D3"] = { value: "", formula: "=B3*C3", isFormula: true };
    
    initial["A4"] = { value: "Orange", formula: "", isFormula: false };
    initial["B4"] = { value: "15", formula: "", isFormula: false };
    initial["C4"] = { value: "2.00", formula: "", isFormula: false };
    initial["D4"] = { value: "", formula: "=B4*C4", isFormula: true };
    
    // Totals row
    initial["A6"] = { value: "Grand Total:", formula: "", isFormula: false };
    initial["D6"] = { value: "", formula: "=SUM(D2:D4)", isFormula: true };
    
    return initial;
  });
  
  const [selectedCell, setSelectedCell] = useState<string>("A1");
  const [formulaBarValue, setFormulaBarValue] = useState<string>("");
  const [copiedCell, setCopiedCell] = useState<string | null>(null);

  const getCellId = (col: string, row: number) => `${col}${row}`;

  const evaluateFormula = useCallback((formula: string, cells: Record<string, Cell>): string => {
    if (!formula.startsWith("=")) return formula;
    
    try {
      // Handle SUM function
      const sumMatch = formula.match(/=SUM\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)/i);
      if (sumMatch) {
        const [, startCol, startRow, endCol, endRow] = sumMatch;
        const startColIndex = COLUMNS.indexOf(startCol.toUpperCase());
        const endColIndex = COLUMNS.indexOf(endCol.toUpperCase());
        const start = parseInt(startRow);
        const end = parseInt(endRow);
        
        let sum = 0;
        for (let col = startColIndex; col <= endColIndex; col++) {
          for (let row = start; row <= end; row++) {
            const cellId = getCellId(COLUMNS[col], row);
            const cellValue = cells[cellId];
            if (cellValue) {
              const evaluated = evaluateFormula(cellValue.formula || cellValue.value, cells);
              const num = parseFloat(evaluated);
              if (!isNaN(num)) sum += num;
            }
          }
        }
        return sum.toFixed(2);
      }
      
      // Handle simple arithmetic with cell references
      let evalFormula = formula.substring(1);
      
      // Replace cell references with their values
      COLUMNS.forEach((col) => {
        for (let row = 1; row <= GRID_ROWS; row++) {
          const cellId = getCellId(col, row);
          const cell = cells[cellId];
          if (cell) {
            const cellValue = evaluateFormula(cell.formula || cell.value, cells);
            const regex = new RegExp(`\\b${cellId}\\b`, "g");
            evalFormula = evalFormula.replace(regex, cellValue || "0");
          }
        }
      });
      
      // Evaluate the expression
      // Simple math evaluation (be careful with eval in production)
      const result = Function(`"use strict"; return (${evalFormula})`)();
      return typeof result === "number" ? result.toFixed(2) : String(result);
    } catch {
      return "#ERROR!";
    }
  }, []);

  const handleCellSelect = (cellId: string) => {
    setSelectedCell(cellId);
    const cell = cells[cellId];
    setFormulaBarValue(cell?.formula || cell?.value || "");
  };

  const handleFormulaChange = (value: string) => {
    setFormulaBarValue(value);
  };

  const handleFormulaSubmit = () => {
    setCells((prev) => {
      const newCells = { ...prev };
      const cell = newCells[selectedCell];
      const isFormula = formulaBarValue.startsWith("=");
      
      newCells[selectedCell] = {
        value: isFormula ? evaluateFormula(formulaBarValue, prev) : formulaBarValue,
        formula: formulaBarValue,
        isFormula,
      };
      
      // Recalculate dependent formulas
      Object.keys(newCells).forEach((id) => {
        if (newCells[id].isFormula && newCells[id].formula.includes(id)) {
          // This is a simplified version - full implementation would track dependencies
        }
      });
      
      return newCells;
    });
  };

  const handleCellInput = (cellId: string, value: string) => {
    setCells((prev) => {
      const newCells = { ...prev };
      const isFormula = value.startsWith("=");
      
      newCells[cellId] = {
        value: isFormula ? evaluateFormula(value, prev) : value,
        formula: value,
        isFormula,
      };
      
      return newCells;
    });
  };

  const resetGrid = () => {
    setCells({});
    setSelectedCell("A1");
    setFormulaBarValue("");
  };

  const copyCell = () => {
    const cell = cells[selectedCell];
    if (cell) {
      navigator.clipboard.writeText(cell.value || cell.formula || "");
      setCopiedCell(selectedCell);
      setTimeout(() => setCopiedCell(null), 2000);
    }
  };

  return (
    <div className="p-6 md:p-8">
      <Breadcrumbs />
      
      <div className="mt-6 mb-8">
        <h1 className="text-3xl font-bold">Interactive Practice</h1>
        <p className="text-muted-foreground mt-2">
          Practice Excel formulas and cell editing in our interactive spreadsheet simulator.
        </p>
      </div>

      {/* Formula Bar */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-16 items-center justify-center bg-muted rounded-lg font-mono font-semibold">
              {selectedCell}
            </div>
            <div className="flex-1">
              <Input
                value={formulaBarValue}
                onChange={(e) => handleFormulaChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleFormulaSubmit();
                  }
                }}
                placeholder="Enter value or formula (start with =)"
                className="font-mono"
              />
            </div>
            <Button onClick={handleFormulaSubmit}>
              <Check className="h-4 w-4 mr-1" />
              Apply
            </Button>
            <Button variant="outline" onClick={copyCell}>
              {copiedCell ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Spreadsheet Grid */}
      <Card>
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Grid3X3 className="h-5 w-5" />
              Spreadsheet Simulator
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={resetGrid}>
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header Row */}
            <div className="flex border-b bg-muted/50">
              <div className="w-12 h-8 flex items-center justify-center border-r" />
              {COLUMNS.map((col) => (
                <div 
                  key={col} 
                  className="w-24 h-8 flex items-center justify-center border-r font-semibold text-sm"
                >
                  {col}
                </div>
              ))}
            </div>

            {/* Data Rows */}
            {Array.from({ length: GRID_ROWS }, (_, rowIndex) => rowIndex + 1).map((row) => (
              <div key={row} className="flex border-b">
                {/* Row Number */}
                <div className="w-12 h-10 flex items-center justify-center border-r bg-muted/50 font-semibold text-sm text-muted-foreground">
                  {row}
                </div>
                
                {/* Cells */}
                {COLUMNS.map((col) => {
                  const cellId = getCellId(col, row);
                  const cell = cells[cellId];
                  const isSelected = selectedCell === cellId;
                  
                  return (
                    <div
                      key={cellId}
                      onClick={() => handleCellSelect(cellId)}
                      onDoubleClick={() => {
                        const input = document.createElement("input");
                        input.type = "text";
                        input.value = cell?.formula || cell?.value || "";
                        input.className = "w-full h-full px-2 bg-background border border-primary outline-none";
                        const cellElement = document.getElementById(`cell-${cellId}`);
                        if (cellElement) {
                          cellElement.innerHTML = "";
                          cellElement.appendChild(input);
                          input.focus();
                          input.onblur = () => {
                            handleCellInput(cellId, input.value);
                          };
                          input.onkeydown = (e) => {
                            if (e.key === "Enter") {
                              handleCellInput(cellId, input.value);
                            }
                            if (e.key === "Escape") {
                              handleCellInput(cellId, cell?.formula || cell?.value || "");
                            }
                          };
                        }
                      }}
                      className={cn(
                        "w-24 h-10 flex items-center border-r px-2 cursor-pointer transition-colors",
                        "hover:bg-muted/50",
                        isSelected && "ring-2 ring-primary ring-inset bg-primary/5",
                        cell?.isFormula && "bg-primary/5"
                      )}
                      id={`cell-${cellId}`}
                    >
                      {cell ? (
                        <span className={cn(
                          "text-sm truncate w-full",
                          cell.isFormula && "font-mono text-blue-600 dark:text-blue-400"
                        )}>
                          {cell.value}
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="mt-6">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Hash className="h-4 w-4" />
            Tips for Practice
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Click a cell to select it and see its content in the formula bar</li>
            <li>• Double-click to edit a cell directly</li>
            <li>• Start formulas with = (e.g., =A1+B1)</li>
            <li>• Try: =SUM(B2:B4), =A2*C2, =A2+B2+C2</li>
            <li>• The simulator supports basic arithmetic and SUM function</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}