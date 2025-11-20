import {  useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { authClient } from "@/api/authClient";
import type { UserWithRole } from "better-auth/plugins/admin";
import { Input } from "@/components/ui/input";
const columns: ColumnDef<UserWithRole>[] = [
  {
    accessorKey: "name",
    header: "Username",
    cell: ({ row }) => (
      <div className="font-semibold">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const isAdmin = row.getValue("role");
      return (
        <span
          className={`px-2 py-1 text-xs rounded-md ${
            isAdmin === "admin"
              ? "bg-red-200 text-red-700"
              : "bg-green-200 text-green-700"
          }`}
        >
          {isAdmin === "admin" ? "Admin" : "User"}
        </span>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "id",
    enableHiding:true,
    header: "ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "createdAt",
    enableHiding:true,
    header: "Created-At",
    cell: ({ row }) => <div className="capitalize">{new Date(row.getValue("createdAt")).toLocaleString('id-ID',{day:'2-digit',month:'2-digit',year:'numeric'})}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const ID = row.getValue("id") as string;
      const queryClient = useQueryClient();
      const roleOriginal=row.original.role
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
              onClick={async () => {
                const { error } =roleOriginal==='user'?await authClient.admin.setRole({
                  userId: ID,
                  role: "admin",
                }):await authClient.admin.setRole({
                  userId: ID,
                  role: "user",
                });
                if (error) {
                  toast(roleOriginal==='user'?"Failed Promoting to admin":"Failed Demoting to user");
                  return;
                }
                toast(roleOriginal==='user'?"Successfully becoming admin":"Successfully set user");
                queryClient.invalidateQueries({ queryKey: ["users"] });
              }}
            >
              {roleOriginal==='user'?'Set to Admin':'Set to User'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={async () => {const {error}=await authClient.admin.removeUser({userId:ID});if(error){toast('Failed to remove User');return};toast(`Successfully removing user`);queryClient.invalidateQueries({queryKey:['users']});return}}>
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
async function getAllUser({
  pagination,
  searchUser
}: {
  pagination: { pageSize: number; pageIndex: number },searchUser:string;
}) {
  const { data} = await authClient.admin.listUsers({
    query: {
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
      searchValue:searchUser,
      searchField:'name',

    },
  });
  const totalUser=data?.total??undefined;
  const dataUser=data?.users ?? []
  return {data:dataUser,total:totalUser};
}
export default function UsersTable() {
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });
  const [searchUser,setSearchUser]=useState<string>('')
  const {
    data:userResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", pagination,searchUser],
    queryFn: () => getAllUser({ pagination,searchUser }),
    placeholderData: keepPreviousData,
  });
  const data=userResponse?.data??[]
  const totalUser=userResponse?.total??0
  const table = useReactTable({
    data: data,
    columns,
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel:getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      rowSelection,
      pagination,
    },
  });
  const currentPageRows = table.getPaginationRowModel().rows;
  return (
    <div className="w-full">
      {isLoading ? (
        <div>IsLoading</div>
      ) : error ? (
        <div>Error</div>
      ) : (
        <div>
          {/* TABLE */}
          <div className="flex items-center py-4 flex-col gap-2">
            <Input
          placeholder="Searching Username...."
           value={searchUser}
  onChange={(e) => setSearchUser(e.target.value)}
          className="max-w-sm self-start"
        />
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
              Page: {pagination.pageIndex}, Row: {currentPageRows.length}, Total Users: {totalUser}
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
