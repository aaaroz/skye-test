import { Button } from "@/components/ui/button";
import { TStudent } from "@/entities";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<TStudent>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "birthdate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal Lahir
          <ArrowUpDown className="ml-2 size-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("birthdate");
      const { nanoseconds, seconds } = value as {
        nanoseconds: number;
        seconds: number;
      };

      const miliseconds = seconds * 1000 + nanoseconds / 1000000;
      const date = new Date(miliseconds);
      const formattedDate = format(date, "dd-MM-yyyy");
      return formattedDate;
    },
  },
  {
    accessorKey: "birthplace",
    header: "Tempat Lahir",
  },
  {
    accessorKey: "gender",
    header: "Jenis Kelamin",
    cell: ({ row }) => {
      const value = row.getValue("gender");
      return value === "male" ? "Laki-laki" : "Perempuan";
    },
  },
  {
    accessorKey: "phone",
    header: "No Whatsapp",
  },
  {
    accessorKey: "class",
    header: "Kelas",
  },
  {
    accessorKey: "nis",
    header: "Nomor Induk Siswa",
  },
  {
    accessorKey: "hobby",
    header: "Hobi",
  },
];
