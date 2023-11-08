import fs from "fs";
import { writeFile } from "fs/promises";
import { join } from "path";

export default function Page() {
  async function upload(data: FormData) {
    "use server";

    const file: File | null = data.get("imageUpload") as unknown as File;
    if (!file) {
      throw new Error("No file uploaded");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const myPath = "public/collections";

    if (!fs.existsSync(myPath)) {
      fs.mkdirSync(myPath, { recursive: true });
    }

    const path = join("./", myPath, file.name);
    await writeFile(path, buffer);
    console.log(`open ${path} to see the uploaded file`);

    return { success: true };
  }

  return (
    <>
      <h1>Single Upload</h1>
      <form action={upload}>
        <input type="file" name="imageUpload" multiple />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
