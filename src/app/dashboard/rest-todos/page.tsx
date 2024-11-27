import prisma from "@/lib/prisma";

export const metadata = {
 title: 'TODO List',
 description: 'Todo Title',
};


export default async function RestTodosPage() {

  const todos = await prisma.todo.findMany({
    orderBy:{
      description:"desc"}
  })

  return (
    <div>
      <h1>{JSON.stringify(todos)}</h1>
    </div>
  );
}