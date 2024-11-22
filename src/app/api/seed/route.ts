import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: Request) {

    await prisma.todo.deleteMany();

    await prisma.todo.createMany({
        data:[
            {description: 'Buy milk',complete: true},
            {description: 'Buy bread'},
            {description: 'Buy eggs'},
            {description: 'Buy butter'},
            {description: 'Buy sugar'},
        ]
    });


    return new Response(
        JSON.stringify({
            message: 'Seed executed successfully',
            
        })
    );
}
