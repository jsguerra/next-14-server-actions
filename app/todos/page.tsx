import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function TodosPage() {
  const todos = await prisma.toDo.findMany();

  const addTodo = async (formData: FormData) => {
    "use server"

    const content = formData.get("content");
    await prisma.toDo.create({
      data: {
        content: content as string,
      },
    });

    revalidatePath("/todos");
  }

  return (
    <main className="flex min-h-screen flex-col items-center w-full p-24">
      <h1 className="text-2xl font-bold">Todos Page</h1>
      <form action={addTodo} className="flex flex-col w-[300px] my-16">
        <input
          type="text"
          name="content"
          className="px-4 py-2 mb-3"
          placeholder="Write your todo..."
          required
        />
        <button className="bg-blue-500 rounded px-4 py-2 text-white font-semibold">
          Add
        </button>
      </form>

      <ul className="list-disc">
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
    </main>
  );
}
