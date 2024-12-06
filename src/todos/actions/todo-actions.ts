'use server';

import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { revalidateTag } from 'next/cache';

export const toggleTodo = async (
    id: string,
    complete: boolean
): Promise<Todo> => {
    const todo = await prisma.todo.findFirst({
        where: { id },
    });
    if (!todo) {
        throw new Error(`No todo found with the id: ${id}`);
    }

    const updatededTodo = await prisma.todo.update({
        where: { id },
        data: { complete },
    });

    revalidateTag('dashboard/server-todos');
    return updatededTodo;
};
