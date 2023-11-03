import prisma from "@/app/lib/prisma";
import Form from "@/components/Form";

export default async function TodosPage() {
  const todos = await prisma.toDo.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center w-full p-24">
      <h1 className="text-2xl font-bold">Todos Page</h1>

      <Form />

      <ul className="list-disc">
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
    </main>
  );
}
