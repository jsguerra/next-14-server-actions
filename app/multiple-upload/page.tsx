import fs from "fs";
import { writeFile } from "fs/promises";
import { join } from "path";

export default function Page2() {
  async function upload(data: FormData) {
    "use server";

    const files: FileList | null = data.getAll(
      "imageUpload"
    ) as unknown as FileList;
    if (!files) {
      throw new Error("No file uploaded");
    }

    const myPath = "public/collections";

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      if (!fs.existsSync(myPath)) {
        fs.mkdirSync(myPath, { recursive: true });
      }

      const path = join("./", myPath, file.name);
      await writeFile(path, buffer);
      console.log(`open ${path} to see the uploaded file`);
    }

    return { success: true };
  }

  return (
    <>
      <h1>Multiple Upload</h1>
      <form action={upload}>
        <input type="file" name="imageUpload" multiple />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
