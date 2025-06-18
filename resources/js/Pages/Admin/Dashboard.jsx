import React from 'react'
import { usePage } from '@inertiajs/react'
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'

export default function Dashboard() {
    const { totalReports, reportsPerOutlet, dailyReports, promoTypes } = usePage().props

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            <h2 className="text-xl font-bold">Dashboard Promosi</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <div className="text-sm text-gray-500">Total Laporan</div>
                    <div className="text-2xl font-bold">{totalReports}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="font-semibold mb-2">Laporan per Outlet</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={reportsPerOutlet}>
                            <XAxis dataKey="outlet" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="total" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h3 className="font-semibold mb-2">Jenis Promosi Terpopuler</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={promoTypes}
                                dataKey="total"
                                nameKey="promo_type"
                                outerRadius={80}
                                label
                            >
                                {promoTypes.map((entry, index) => (
                                    <Cell key={`cell-${index}`} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold mb-2">Laporan 7 Hari Terakhir</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={dailyReports}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="total" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
