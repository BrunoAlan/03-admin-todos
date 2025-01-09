'use server';

import { getUserSessionServer } from '@/auth/actions/auth-actions';
import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { revalidateTag } from 'next/cache';

export const sleep = async (seconds: number = 0) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), seconds * 1000);
    });
};

export const toggleTodo = async (
    id: string,
    complete: boolean
): Promise<Todo> => {
    await sleep(3);
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

export const addTodo = async (description: string) => {
    const user = await getUserSessionServer();
    try {
        const newTodo = await prisma.todo.create({
            data: {
                description,
                userId: user.id,
            },
        });

        revalidateTag('dashboard/server-todos');

        return newTodo;
    } catch {
        return {
            message: 'Error creating todo',
        };
    }
};

export const deleteCompleted = async () => {
    try {
        await prisma.todo.deleteMany({
            where: {
                complete: true,
            },
        });

        revalidateTag('dashboard/server-todos');
    } catch {
        return {
            message: 'Error deleting todos',
        };
    }
};
