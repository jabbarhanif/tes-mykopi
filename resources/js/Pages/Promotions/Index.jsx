import React from 'react'
import { Link, usePage } from '@inertiajs/react'
import { useForm } from '@inertiajs/react'
import { Inertia } from '@inertiajs/inertia'


export default function Index() {
    const { filters, promotions } = usePage().props

    const { data, setData, get } = useForm({
        start_date: filters.start_date || '',
        end_date: filters.end_date || '',
    })

    const handleFilter = (e) => {
        e.preventDefault()
        get(route('promotions.index'), {
            preserveState: true,
        })
    }

    return (
        <div className="max-w-4xl mx-auto p-6 text-white bg-zinc-900 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-fuchsia-400">Riwayat Laporan Promosi</h2>
                <Link
                    href={route('promotions.create')}
                    className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded shadow"
                >
                    + Laporan Baru
                </Link>
            </div>

            <form onSubmit={handleFilter} className="flex flex-wrap gap-4 items-end mb-6">
                <div>
                    <label className="block text-sm font-medium mb-1 text-fuchsia-400">Dari Tanggal</label>
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
                    <label className="block text-sm font-medium mb-1 text-fuchsia-400">Sampai Tanggal</label>
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

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded shadow"
                >
                    🔍 Terapkan Filter
                </button>
            </form>

            {promotions.length === 0 && (
                <p className="text-zinc-400">Belum ada laporan.</p>
            )}

            <div className="space-y-6">
                {promotions.map((promo) => (
                    <div
                        key={promo.id}
                        className="rounded-xl p-6 shadow-xl backdrop-blur-sm bg-white/10 border border-white/10"
                    >
                        <div className="mb-2">
                            <div className="text-lg font-bold text-fuchsia-300">{promo.promo_type}</div>
                            <div className="text-xs text-zinc-400">
                                {promo.promo_date} • Trafik: {promo.estimated_traffic ?? 'N/A'}
                            </div>
                            <div className="text-sm text-zinc-200 mt-1">{promo.description}</div>
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
                        <button
                            onClick={() => {
                                if (confirm('Yakin ingin menghapus laporan ini?')) {
                                    Inertia.delete(route('promotions.destroy', promo.id))
                                }
                            }}
                            className="mt-4 inline-block bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded shadow"
                        >
                            🗑 Hapus Laporan
                        </button>

                    </div>
                ))}
            </div>
        </div>
    )
}
