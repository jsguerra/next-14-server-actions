"use client";

import { addTodo } from "@/actions/actions";
import React from "react";
import Button from "./Button";

export default function Form() {
  const ref = React.useRef<HTMLFormElement>(null);
  // The recommendation is to write a function in actions
  // change action={addTodo} to action={() => ...}
  return (
    <form
      ref={ref}
      action={async (formData) => {
        ref.current?.reset();

        await addTodo(formData);
      }}
      className="flex flex-col w-[300px] my-16"
    >
      <input
        type="text"
        name="content"
        className="px-4 py-2 mb-3"
        placeholder="Write your todo..."
        required
        autoComplete="off"
      />
      <Button />
    </form>
  );
}
