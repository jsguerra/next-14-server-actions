"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export const addTodo = async (formData: FormData) => {
  const content = formData.get("content");

  try {
    await prisma.toDo.create({
      data: {
        content: content as string,
      },
    }); 
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/todos");
};
