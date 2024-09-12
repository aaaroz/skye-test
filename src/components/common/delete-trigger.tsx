import { APIStudent } from "@/apis";
import { TrashIcon } from "lucide-react";

import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

export const DeleteTrigger: React.FC<{ id: string }> = ({
  id,
}): React.ReactElement => {
  //   const { toggleShouldFetchNewData } = useCommonContext();
  const handleDelete = async () => {
    await APIStudent.deleteStudent(id);
    // toggleShouldFetchNewData(true);
    toast.success("Data user berhasil di hapus");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="destructive">
          <TrashIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 border-0 max-w-md overflow-hidden">
        <DialogHeader className="p-5 pb-2.5">
          <DialogTitle className="text-2xl font-bold">
            Apakah anda yakin?
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="p-5">
          Setelah dihapus data tidak dapat dikembalikan, apakah anda yakin ingin
          menghapus data ini?
        </DialogDescription>
        <DialogFooter className="p-5 pt-2.5 justify-end">
          <DialogClose asChild>
            <Button type="button" variant="ghost" key={id}>
              Batal
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="destructive" onClick={handleDelete}>
              Ya saya yakin
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
