import { WidgetItem } from '@/components';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    const session = await getServerSession();
    if (!session) redirect('/api/auth/signin');

    return (
        <div className='grid gap-6 md:grid-cols-1 lg:grid-cols-2'>
            <WidgetItem title='User logged'>
                <div className='flex flex-col'>
                    <span>{session.user?.name}</span>
                    <span>{session.user?.email}</span>
                    <span>{session.user?.image}</span>
                </div>
            </WidgetItem>
        </div>
    );
}
