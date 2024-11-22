import prisma from '@/lib/prisma';

export async function GET() {

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
