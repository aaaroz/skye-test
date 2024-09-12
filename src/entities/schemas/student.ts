import { z } from "zod";

export const studentSchema = z.object({
  id: z.string().optional(),
  name: z.string({ required_error: "Nama harus diisi!" }),
  birthdate: z.date({ required_error: "Pilih tanggal lahir!" }),
  birthplace: z.string({ required_error: "Masukan tempat lahir!" }),
  hobby: z.string({ required_error: "Masukan Hobi!" }),
  gender: z.string({ required_error: "Pilih jenis kelamin!" }),
  nis: z.string({ required_error: "Masukan nomor induk siswa!" }),
  class: z.string({ required_error: "Masukan kelas siswa!" }),
  phone: z.string({ required_error: "Masukan nomor whatsapp siswa!" }),
});

export type TStudent = z.infer<typeof studentSchema>;
