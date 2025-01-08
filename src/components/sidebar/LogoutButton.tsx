'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { CiLogout, CiCloudRainbow, CiLogin } from 'react-icons/ci';

export const LogoutButton = () => {
    const { data: session, status } = useSession();

    if (status === 'loading')
        return (
            <button className='px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group'>
                <CiCloudRainbow />
                <span className='group-hover:text-gray-700'>Logout</span>
            </button>
        );

    if (status === 'authenticated')
        return (
            <button
                onClick={() => signOut()}
                className='px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group'
            >
                <CiLogin />
                <span className='group-hover:text-gray-700'>Logout</span>
            </button>
        );

    return (
        <button
            onClick={() => signOut()}
            className='px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group'
        >
            <CiLogout />
            <span className='group-hover:text-gray-700'>Logout</span>
        </button>
    );
};
