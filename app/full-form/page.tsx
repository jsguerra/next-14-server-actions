"use client";

import { useState } from "react";
import { upload } from "@/actions/actions";

export default function Page() {
  const [thumbnail, setThumbnail] = useState("");

  function handleChange(e) {
    setThumbnail(e.target.files[0].name);
    console.log(e.target.files[0].name);
  }

  return (
    <>
      <h1>Full Form</h1>
      <form
        action={upload}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "flex-start",
        }}
      >
        <input
          style={{ padding: "6px" }}
          type="file"
          name="imageUpload"
          onChange={handleChange}
          multiple
        />
        <input
          style={{ padding: "6px" }}
          type="text"
          name="name"
          placeholder="Name"
        />
        <input
          style={{ padding: "6px" }}
          type="text"
          name="path"
          placeholder="Path"
        />
        <input
          style={{ padding: "6px" }}
          type="text"
          name="thumbnail"
          placeholder="Thumbnail"
          onChange={handleChange}
          value={thumbnail}
        />
        <button style={{ padding: "6px" }} type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
