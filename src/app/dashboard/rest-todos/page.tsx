import prisma from '@/lib/prisma';
import { TodosGrid } from '@/todos';

export const metadata = {
    title: 'TODO List',
    description: 'Todo Title',
};

export default async function RestTodosPage() {
    const todos = await prisma.todo.findMany({
        orderBy: {
            description: 'desc',
        },
    });

    return <TodosGrid todos={todos} />;
}
