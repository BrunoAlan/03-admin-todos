import { Todo } from '@prisma/client';

const sleep = (seconds: number = 0): Promise<boolean> => {
    return new Promise((resolve) =>
        setTimeout(() => resolve(true), seconds * 1000)
    );
};

export const updateTodo = async (
    id: string,
    complete: boolean
): Promise<Todo> => {
    const body = {
        complete,
    };

    //TODO: optimistic update
    // await sleep(3);
    const todo = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then((res) => res.json());
    console.log(todo);
    return todo;
};

export const createTodo = async (description: string): Promise<Todo> => {
    const body = {
        description,
    };

    const todo = await fetch(`/api/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then((res) => res.json());
    console.log(todo);
    return todo;
};

export const deleteTodo = async () => {
    const todos = await fetch(`/api/todos`, {
        method: 'DELETE',
    }).then((res) => res.json());
    console.log(todos);
    return todos;
};
