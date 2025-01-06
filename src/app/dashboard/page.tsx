import { WidgetItem } from '@/components';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    const session = await getServerSession();
    if (!session) redirect('/api/auth/signin');

    return (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            <WidgetItem title='User logged'>
                {JSON.stringify(session.user)}
            </WidgetItem>
        </div>
    );
}
