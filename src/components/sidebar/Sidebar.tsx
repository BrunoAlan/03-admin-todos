import Image from 'next/image';
import Link from 'next/link';
import { CiBookmarkCheck } from 'react-icons/ci';
import {
    IoBasketOutline,
    IoCheckboxOutline,
    IoCodeWorking,
    IoListOutline,
    IoPersonOutline,
} from 'react-icons/io5';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { SidebarItem, LogoutButton } from '@/components';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const menuItems = [
    {
        icon: <CiBookmarkCheck />,
        title: 'Dashboard',
        path: '/dashboard',
    },
    {
        icon: <IoCheckboxOutline />,
        title: 'Rest TODOS',
        path: '/dashboard/rest-todos',
    },
    {
        icon: <IoListOutline />,
        title: 'Server Actions',
        path: '/dashboard/server-todos',
    },
    {
        icon: <IoCodeWorking />,
        title: 'Cookies',
        path: '/dashboard/cookies',
    },
    {
        icon: <IoBasketOutline />,
        title: 'Products',
        path: '/dashboard/products',
    },
    {
        icon: <IoPersonOutline />,
        title: 'Profile',
        path: '/dashboard/profile',
    },
];

export const Sidebar = async () => {
    const session = await getServerSession(authOptions);
    if (!session) redirect('/api/auth/signin');

    return (
        <aside className='ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]'>
            <div>
                <div className='-mx-6 px-6 py-4'>
                    <Link href='/dashboard' title='home'>
                        <Image
                            src='https://www.svgrepo.com/show/354512/vercel.svg'
                            className='w-32'
                            width={32}
                            height={20}
                            alt='tailus logo'
                        />
                    </Link>
                </div>

                <div className='mt-8 text-center'>
                    {session?.user?.image ? (
                        <Image
                            src={session?.user?.image}
                            alt=''
                            width={32}
                            height={32}
                            className='w-32 h-32 m-auto rounded-full object-cover lg:w-32 lg:h-32'
                        />
                    ) : (
                        <Image
                            src='https://images.unsplash.com/photo-1542909168-82c3e7fdca5c'
                            alt=''
                            width={32}
                            height={32}
                            className='w-32 h-32 m-auto rounded-full object-cover lg:w-32 lg:h-32'
                        />
                    )}

                    <h5 className='hidden mt-4 text-xl font-semibold text-gray-600 lg:block'>
                        {session?.user?.name}
                    </h5>
                    <span className='hidden text-gray-400 lg:block capitalize'>
                        {session.user?.roles?.join(', ')}
                    </span>
                </div>

                <ul className='space-y-2 tracking-wide mt-8'>
                    {menuItems.map((item, index) => (
                        <SidebarItem key={index} {...item} />
                    ))}
                </ul>
            </div>
            <div className='px-6 -mx-6 pt-4 flex justify-between items-center border-t'>
                <LogoutButton />
            </div>
        </aside>
    );
};
