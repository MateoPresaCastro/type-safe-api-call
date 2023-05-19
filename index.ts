import { z } from "https://deno.land/x/zod@v3.21.4/mod.ts";

const Todo = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

type Todo = z.infer<typeof Todo>;

const todo = await getTodo();

if (!(todo instanceof Error)) {
  // everything is ok here
  const { title } = todo;
  console.log(title.toUpperCase());
}

async function getTodo() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    if (!res.ok) {
      throw new Error("The response is not ok");
    }

    const todo = await res.json();
    if (!isTodo(todo)) {
      throw new Error("The data is not a todo");
    }
    return todo;
  } catch (error) {
    console.error({ error });
    return new Error("Error in getTodo", { cause: error });
  }
}

function isTodo(todo: unknown): todo is Todo {
  return Todo.safeParse(todo).success;
}
 