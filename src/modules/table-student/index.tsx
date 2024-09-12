import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { TStudent } from "@/entities";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormStudentTrigger } from "@/components/common/form-student";
import { DeleteTrigger } from "@/components/common/delete-trigger";
import { APIStudent } from "@/apis";
import { useToggleFetchData } from "@/lib/hooks";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";

export const TableStudent: React.FC = (): React.ReactElement => {
  const [data, setData] = React.useState<TStudent[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
    },
  });
  const { shouldFetchNewData, toggleShouldFetchNewData } = useToggleFetchData();

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await APIStudent.getStudents();
      setData(response);
    };
    fetchData();

    if (shouldFetchNewData) {
      fetchData();
      toggleShouldFetchNewData(false);
    }
  }, [shouldFetchNewData, toggleShouldFetchNewData]);

  return (
    <>
      <Table className="border">
        <TableHeader className="border-b rounded-t-sm bg-neutral-100 ">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              <TableHead>No</TableHead>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
              <TableHead>Action</TableHead>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                <TableCell>{index + 1}</TableCell>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell className="space-x-2">
                  <FormStudentTrigger id={row.original.id} />
                  <DeleteTrigger id={row.original.id as string} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + 2}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  );
};
