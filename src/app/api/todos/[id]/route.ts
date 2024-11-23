import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import * as yup from 'yup';

interface Segments {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(request: Request, { params }: Segments) {
    const { id } = await params;

    const todo = await prisma.todo.findFirst({
        where: {
            id: id,
        },
    });

    if (!todo) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(todo);
}

const putScheme = yup.object({
    description: yup.string().optional(),
    complete: yup.boolean().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
    const { id } = await params;

    const todo = await prisma.todo.findFirst({
        where: {
            id: id,
        },
    });

    if (!todo) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    try {
        const { description, complete } = await putScheme.validate(
            await request.json()
        );

        const updatedTodo = await prisma.todo.update({
            where: {
                id: id,
            },
            data: {
                description,
                complete,
            },
        });
        return NextResponse.json(updatedTodo);
    } catch {
        return NextResponse.json(
            { error: 'Validation error' },
            { status: 400 }
        );
    }
}
