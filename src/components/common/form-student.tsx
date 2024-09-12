import * as React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { studentSchema, TStudent } from "@/entities";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, EditIcon, PlusIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useToggleFetchData } from "@/lib/hooks";
import { APIStudent } from "@/apis";
import { toast } from "sonner";

interface FormStudentTriggerProps {
  id?: string;
}
export const FormStudentTrigger: React.FC<FormStudentTriggerProps> = ({
  id,
}): React.ReactElement => {
  const form = useForm<TStudent>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      birthplace: "",
      gender: "",
      phone: "",
      class: "",
      nis: "",
      hobby: "",
    },
    mode: "onChange",
  });
  const { toggleShouldFetchNewData } = useToggleFetchData();

  async function onSubmit(values: TStudent) {
    if (id) {
      await APIStudent.updateStudent(id, values);
      toggleShouldFetchNewData(true);
      toast.success("Data Student berhasil diperbarui");
    } else {
      await APIStudent.addStudent(values);
      toggleShouldFetchNewData(true);
      toast.success("Data Student berhasil ditambahkan");
      form.reset();
    }
  }

  React.useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const response = await APIStudent.getStudent(id);
        if (response) {
          form.setValue("name", response?.name);
          form.setValue("birthplace", response?.birthplace);
          form.setValue("gender", response?.gender);
          form.setValue("phone", response?.phone);
          form.setValue("class", response?.class);
          form.setValue("nis", response?.nis);
          form.setValue("hobby", response?.hobby);

          const value = response?.birthdate;
          const { nanoseconds, seconds } = value as unknown as {
            nanoseconds: number;
            seconds: number;
          };

          const miliseconds = seconds * 1000 + nanoseconds / 1000000;
          const date = new Date(miliseconds);

          form.setValue("birthdate", date);
        }
      };
      fetchData();
    }
  }, [id, form]);

  const icon = id ? (
    <EditIcon className="w-5 h-5" />
  ) : (
    <PlusIcon className="w-5 h-5" />
  );
  const text = id ? "Edit" : "Tambah";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{icon}</Button>
      </DialogTrigger>
      <DialogContent aria-describedby="Form Dialog" aria-description="Form">
        <DialogHeader>
          <DialogTitle>Form {text} User</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Isi form di bawah ini untuk {text} Siswa.
        </DialogDescription>
        <Form {...form}>
          <form
            id="form-student"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-5 px-2 h-[70dvh] overflow-auto"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="john doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        fromYear={2000}
                        toYear={2010}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthplace"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tempat lahir</FormLabel>
                  <FormControl>
                    <Input placeholder="bandung" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Jenis Kelamin</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                        <FormLabel className="font-normal">Laki-laki</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                        <FormLabel className="font-normal">Perempuan</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No WhatsApp</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="08123xxxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="class"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kelas</FormLabel>
                  <FormControl>
                    <Input placeholder="A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Induk Siswa</FormLabel>
                  <FormControl>
                    <Input placeholder="281xx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hobby"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hobi</FormLabel>
                  <FormControl>
                    <Input placeholder="Membaca" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Batal</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              form="form-student"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              Simpan
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
