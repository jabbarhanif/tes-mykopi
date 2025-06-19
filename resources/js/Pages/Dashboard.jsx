import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-white dark:text-white">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-zinc-900 min-h-screen text-white">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-xl bg-white/10 shadow-xl backdrop-blur-md border border-white/10">
                        <div className="p-6 text-white text-lg">
                            You're logged in!

                            <div className="mt-6 space-x-4">
                                {auth.user.role === 'marketing' && (
                                    <Link
                                        href="/admin/promotions"
                                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
                                    >
                                        ➤ Ke Kontrol Promosi
                                    </Link>
                                )}

                                {auth.user.role === 'outlet' && (
                                    <Link
                                        href="/promotions"
                                        className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition"
                                    >
                                        ➤ Ke Riwayat Laporan
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
