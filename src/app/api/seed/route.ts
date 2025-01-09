import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
    await prisma.todo.deleteMany();
    await prisma.user.deleteMany();
    const user = await prisma.user.create({
        data: {
            email: 'test1@google.com',
            password: bcrypt.hashSync('123456', 10),
            roles: ['admin,client,super-user'],
            todos: {
                create: [
                    { description: 'Buy milk', complete: true },
                    { description: 'Buy bread' },
                    { description: 'Buy eggs' },
                    { description: 'Buy butter' },
                    { description: 'Buy sugar' },
                ],
            },
        },
    });
    return new Response(
        JSON.stringify({
            message: 'Seed executed successfully',
            user,
        })
    );
}
