import React from "react";
import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface PaginatedTableProps {
  data: any[];
  totalPages: number;
  columns: Column[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
}

export const PaginatedTable: React.FC<PaginatedTableProps> = ({
  data,
  totalPages,
  columns,
  currentPage,
  setCurrentPage,
  pageSize,
}) => {
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);

  if (paginatedData.length <= 0)
    return (
      <div className="text-center text-2xl items-center text-gray-500 py-4 flex gap-2 justify-center">
        <span>
          <Frown size="100px"  className="text-red-600"/>
        </span>
        <span>No Entries</span>
      </div>
    );

  return (
    <div>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="border px-4 py-2">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t">
              {columns.map((col) => (
                <td key={col.key} className="border px-4 py-2">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between items-center">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          variant="outline"
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
