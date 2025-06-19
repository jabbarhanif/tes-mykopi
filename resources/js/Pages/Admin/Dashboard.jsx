import React from 'react'
import { usePage } from '@inertiajs/react'
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'

export default function Dashboard() {
    const { totalReports, reportsPerOutlet, dailyReports, promoTypes } = usePage().props

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6 bg-zinc-900 min-h-screen text-white">
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
                            <Tooltip wrapperStyle={{ backgroundColor: '#1f2937', color: '#fff' }} contentStyle={{ color: '#fff' }} />
                            <Legend wrapperStyle={{ color: '#eee' }} />
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
    )
}

// <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//     <div className="bg-white p-4 rounded shadow">
//         <h3 className="font-semibold mb-2">Laporan per Outlet</h3>
//         <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={reportsPerOutlet}>
//                 <XAxis dataKey="outlet" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="total" />
//             </BarChart>
//         </ResponsiveContainer>
//     </div>

//     <div className="bg-white p-4 rounded shadow">
//         <h3 className="font-semibold mb-2">Jenis Promosi Terpopuler</h3>
//         <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//                 <Pie
//                     data={promoTypes}
//                     dataKey="total"
//                     nameKey="promo_type"
//                     outerRadius={80}
//                     label
//                 >
//                     {promoTypes.map((entry, index) => (
//                         <Cell key={`cell-${index}`} />
//                     ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//             </PieChart>
//         </ResponsiveContainer>
//     </div>
// </div>

// <div className="bg-white p-4 rounded shadow">
//     <h3 className="font-semibold mb-2">Laporan 7 Hari Terakhir</h3>
//     <ResponsiveContainer width="100%" height={250}>
//         <BarChart data={dailyReports}>
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="total" />
//         </BarChart>
//     </ResponsiveContainer>
// </div>