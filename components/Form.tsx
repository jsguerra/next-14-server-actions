"use client"

import { addTodo } from "@/actions/actions";
import React from "react";

export default function Form() {
  return (
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
  );
}
