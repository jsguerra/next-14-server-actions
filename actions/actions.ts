"use server";

import prisma from "@/app/lib/prisma";
import fs from "fs";
import { writeFile } from "fs/promises";
import { join } from "path";
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

export async function upload(data: FormData) {
  const name = data.get("name");
  const authorPath = data.get("path");
  const thumbnail = data.get("thumbnail");

  await prisma.author.create({
    data: {
      name: name as string,
      path: authorPath as string,
      thumbnail: thumbnail as string,
    },
  });

  const file: File | null = data.get("imageUpload") as unknown as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const myPath = "public/collections";
  const firstLetter = name?.slice(0, 1);
  let destination = `${myPath}/${firstLetter}`;

  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const path = join("./", destination, file.name);
  await writeFile(path, buffer);
  console.log(`open ${path} to see the uploaded file`);

  return { success: true };
}
