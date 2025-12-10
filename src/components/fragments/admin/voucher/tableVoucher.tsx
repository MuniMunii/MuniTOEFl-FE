import { useEffect, useState } from "react";
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import type { VoucherType } from "@/schemas/voucher";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useMutate } from "@/hooks/useMutation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
const columns: ColumnDef<VoucherType>[] = [
      {
    accessorKey:'id',
    header:"V-ID",
    cell:({row})=>(<div className="font-semibold">{row.getValue('id')}</div>)
  },
  {
    accessorKey: "used",
    header: "Used",
    cell: ({ row }) => {
         const isUsed = row.getValue("used");
        return <span
        className={`px-2 py-1 text-xs rounded-md ${
          isUsed ? "bg-red-200 text-red-700" : "bg-green-200 text-green-700"
        }`}
      >
        {isUsed ? "Used" : "Available"}
      </span>
    },
  },
  {
    accessorKey:'typeV',
    header:"Type",
    cell:({row})=>(<div className="capitalize">{row.getValue('typeV')}</div>)
  },
    {
    accessorKey:'duration',
    header:"Duration",
    cell:({row})=>(<div className="font-semibold">{row.getValue('duration')} {row.getValue('duration')==='1'?'Month':'Months'}</div>)
  },
  {
    accessorKey:'createdAt',
    header:"CreatedAt",
    cell:({row})=>{const date=new Date(row.getValue('createdAt')); return <div className="font-semibold">{date.toLocaleString("id-ID",{day:'2-digit',month:'2-digit',year:'numeric'})}</div>}
  },
    {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const vID = row.getValue('id') as string
      const queryClient=useQueryClient()
          const mutateVoucher = useMutate<VoucherType, { id:string }>({
  url: "/api/voucher/delete-voucher",
    method: "DELETE",
    options:{
        onError:()=>toast('Error deleting voucher'),
        onSuccess:()=>{toast('Successfully deleting voucher');queryClient.invalidateQueries({queryKey:["voucher"]})}
    }
  });
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => mutateVoucher.mutate({id:vID})}
            >
              Delete Voucher
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];
export default function VoucherTable() {
        const { data, isLoading, error } = useFetch<VoucherType[], ["voucher"]>({
    queryKey: ["voucher"],
    url: "/api/voucher/get-all-voucher",
   });
    const [voucherData,setVoucherData]=useState<VoucherType[]>([])
    useEffect(()=>{if(data?.data)setVoucherData(data?.data)},[data])
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
  pageIndex: 0,
  pageSize: 8,
});
const sortedDataBydate=data?.data?.sort((a,b)=>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime())
  const table = useReactTable({
    data: sortedDataBydate||[],
    columns,
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel:getPaginationRowModel(),
    getCoreRowModel:getCoreRowModel(),
    onPaginationChange:setPagination,
    state:{
        rowSelection,
        pagination
    }
  });
  const currentPageRows = table.getPaginationRowModel().rows;
  return (
  <div className="w-full">
    {
    isLoading?(<div>IsLoading</div>):error ? (
      <div>Error</div>
    ) : (
      <div>
        {/* TABLE */}
        <div className="flex items-center py-4">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No Results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {/* PAGINATION */}
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-muted-foreground flex-1 text-sm">
            Page: {pagination.pageIndex}, Row: {currentPageRows.length}
          </div>
          <div className="space-x-2">
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
        </div>
      </div>
    )}
  </div>
);

}
