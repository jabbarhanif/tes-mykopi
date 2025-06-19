import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, usePage } from '@inertiajs/react'
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'

export default function Dashboard() {
    const { auth, totalReports, reportsPerOutlet, dailyReports, promoTypes } = usePage().props

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
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">

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

                    {/* KHUSUS ROLE MARKETING, TAMPILKAN GRAFIK */}
                    {auth.user.role === 'marketing' && (
                        <div className="space-y-8">
                            <h2 className="text-2xl font-extrabold text-fuchsia-400 mb-4">📊 Dashboard Promosi</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="rounded-xl p-5 shadow-lg backdrop-blur-md bg-white/10 border border-white/10">
                                    <div className="text-sm text-zinc-300">Total Laporan</div>
                                    <div className="text-3xl font-bold text-fuchsia-300">{totalReports}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="rounded-xl p-5 shadow-lg backdrop-blur-md bg-white/10 border border-white/10">
                                    <h3 className="font-semibold mb-2 text-fuchsia-300">Laporan per Outlet</h3>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <BarChart data={reportsPerOutlet}>
                                            <XAxis dataKey="outlet" stroke="#ccc" tick={{ fill: '#ccc' }} />
                                            <YAxis stroke="#ccc" tick={{ fill: '#ccc' }} />
                                            <Tooltip wrapperStyle={{ backgroundColor: '#1f2937', color: '#fff' }} contentStyle={{ color: '#a855f7' }} />
                                            <Bar dataKey="total" fill="#a855f7" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="rounded-xl p-5 shadow-lg backdrop-blur-md bg-white/10 border border-white/10">
                                    <h3 className="font-semibold mb-2 text-fuchsia-300">Jenis Promosi Terpopuler</h3>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <PieChart>
                                            <Pie
                                                data={promoTypes}
                                                dataKey="total"
                                                nameKey="promo_type"
                                                outerRadius={80}
                                                label={{ fill: '#fff' }}
                                            >
                                                {promoTypes.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={`hsl(${(index * 60) % 360}, 70%, 60%)`} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="rounded-xl p-5 shadow-lg backdrop-blur-md bg-white/10 border border-white/10">
                                <h3 className="font-semibold mb-2 text-fuchsia-300">Laporan 7 Hari Terakhir</h3>
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={dailyReports}>
                                        <XAxis dataKey="date" stroke="#ccc" tick={{ fill: '#ccc' }} />
                                        <YAxis stroke="#ccc" tick={{ fill: '#ccc' }} />
                                        <Tooltip wrapperStyle={{ backgroundColor: '#1f2937', color: '#fff' }} contentStyle={{ color: '#22c55e' }} />
                                        <Bar dataKey="total" fill="#22c55e" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
