import React from 'react'
import { usePage, useForm, Link } from '@inertiajs/react'

export default function AdminIndex() {
    const { promotions, outlets, filters } = usePage().props

    const { data, setData, get } = useForm({
        start_date: filters.start_date || '',
        end_date: filters.end_date || '',
        outlet_id: filters.outlet_id || '',
    })

    const handleFilter = (e) => {
        e.preventDefault()
        get(route('admin.promotions.index'), { preserveState: true })
    }

    return (
        <div className="max-w-6xl mx-auto p-6 text-white bg-zinc-900 min-h-screen">
            <h2 className="text-2xl font-extrabold text-fuchsia-400 mb-6 tracking-tight">
                📢 Kontrol Promosi Seluruh Outlet
            </h2>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <form onSubmit={handleFilter} className="flex flex-wrap gap-3 items-end">
                    <div className="mr-12">
                        <label className="block text-sm font-medium mb-1 text-zinc-300">Outlet</label>
                        <select
                            value={data.outlet_id}
                            onChange={(e) => setData('outlet_id', e.target.value)}
                            className="border border-zinc-600 rounded px-3 py-2 bg-zinc-800 text-sm text-white"
                        >
                            <option value="">Semua Outlet</option>
                            {outlets.map((outlet) => (
                                <option key={outlet.id} value={outlet.id} className="text-black">
                                    {outlet.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-fuchsia-400">From</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-zinc-400 pointer-events-none">📅</span>
                                <input
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    className="pl-9 pr-3 py-2 rounded bg-zinc-800 border border-zinc-600 text-sm w-full text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-fuchsia-400">To</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-zinc-400 pointer-events-none">📅</span>
                                <input
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    className="pl-9 pr-3 py-2 rounded bg-zinc-800 border border-zinc-600 text-sm w-full text-white"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 transition text-white text-sm px-4 py-2 rounded shadow"
                    >
                        🔍 Terapkan Filter
                    </button>
                </form>

                <a
                    href={route('admin.promotions.export', data)}
                    target="_blank"
                    className="bg-green-600 hover:bg-green-700 transition text-white text-sm px-4 py-2 rounded shadow"
                >
                    ⬇️ Export Excel
                </a>
            </div>

            <div className="space-y-6">
                {promotions.map((promo) => (
                    <div
                        key={promo.id}
                        className="rounded-xl p-6 shadow-xl backdrop-blur-sm bg-white/10 border border-white/10"
                    >
                        <div className="mb-2">
                            <div className="text-lg font-bold text-fuchsia-300">
                                {promo.promo_type}
                            </div>
                            <div className="text-xs text-zinc-400">
                                {promo.promo_date} • Trafik: {promo.estimated_traffic ?? 'N/A'} • {promo.outlet.name}
                            </div>
                            <div className="text-sm text-zinc-200 mt-1">
                                {promo.description}
                            </div>
                            <div className="text-xs text-zinc-400 mt-1">
                                Dikirim oleh: {promo.user.name}
                            </div>
                        </div>

                        {promo.photos.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                                {promo.photos.map((photo) => (
                                    <img
                                        key={photo.id}
                                        src={photo.path}
                                        alt="Foto promosi"
                                        className="rounded-md object-cover w-full h-32 border border-zinc-600 hover:scale-105 transition-transform"
                                    />
                                ))}
                            </div>
                        )}

                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                const formData = new FormData(e.target)
                                const status = formData.get('status')
                                const admin_note = formData.get('admin_note')

                                window.axios.put(
                                    route('admin.promotions.update', { promotion: promo.id }),
                                    { status, admin_note }
                                ).then(() => {
                                    window.location.reload()
                                })
                            }}
                            className="mt-4 pt-3 border-t border-zinc-700 space-y-3"
                        >
                            <div>
                                <label className="block text-sm font-medium">Status</label>
                                <select
                                    name="status"
                                    defaultValue={promo.status}
                                    className="border rounded px-2 py-1 bg-zinc-800 border-zinc-600 text-white"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="reviewed">Reviewed</option>
                                    <option value="approved">Approved</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Catatan/Komentar</label>
                                <textarea
                                    name="admin_note"
                                    defaultValue={promo.admin_note}
                                    className="w-full border rounded p-2 bg-zinc-800 border-zinc-600 text-white"
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-purple-600 hover:bg-purple-700 transition text-white px-4 py-2 rounded shadow"
                            >
                                💾 Simpan Perubahan
                            </button>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    )
}
