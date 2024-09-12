import { FormStudentTrigger } from "./components/common/form-student";
import { Toaster } from "./components/ui/sonner";
import { TableStudent } from "./modules";

function App() {
  return (
    <main className="container min-h-screen py-10">
      <section className="space-y-4 mt-5">
        <hgroup className="flex text-center gap-2 w-full flex-col">
          <h1 className="text-5xl font-bold bg-gradient-to-br from-blue-200 via-blue-300 to-blue-950 bg-clip-text text-transparent">
            SKYE SCHOOL
          </h1>
          <h2 className="text-neutral-500">
            Hello, Selamat data di website manajemen siswa!
          </h2>
        </hgroup>
        <div className="flex justify-end items-center">
          <FormStudentTrigger />
        </div>
        <TableStudent />
      </section>
      <Toaster />
    </main>
  );
}

export default App;
