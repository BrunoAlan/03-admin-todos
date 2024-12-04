import prisma from '@/lib/prisma';
import { NewTodo, TodosGrid } from '@/todos';

export const metadata = {
    title: 'TODO List',
    description: 'Todo Title',
};

export default async function ServerTodosPage() {
    const todos = await prisma.todo.findMany({
        orderBy: {
            description: 'desc',
        },
    });

    return (
        <div>
            <span className='text-3xl mb-10'>Server Actions </span>
            <div className='w-full px-5 mx-5 mb-5'>
                <NewTodo />
            </div>
            <TodosGrid todos={todos} />
        </div>
    );
}