export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getUserSessionServer } from '@/auth/actions/auth-actions';
import prisma from '@/lib/prisma';
import { NewTodo, TodosGrid } from '@/todos';
import { redirect } from 'next/navigation';

export const metadata = {
    title: 'TODO List',
    description: 'Todo Title',
};

export default async function ServerTodosPage() {
    const user = await getUserSessionServer();

    if (!user) {
        redirect('/api/auth/signin');
    }

    const todos = await prisma.todo.findMany({
        where: { userId: user.id },
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
