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

    const [editing, setEditing] = React.useState(null)
    const [editForm, setEditForm] = React.useState({
        promo_type: '',
        description: '',
        promo_date: '',
        estimated_traffic: '',
    })
    const openEditModal = (promo) => {
        setEditing(promo.id)
        setEditForm({
            promo_type: promo.promo_type,
            description: promo.description || '',
            promo_date: promo.promo_date,
            estimated_traffic: promo.estimated_traffic || '',
        })
    }
    const handleEditSubmit = (e) => {
        e.preventDefault()
        Inertia.put(`/promotions/${editing}`, editForm, {
            onSuccess: () => setEditing(null),
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
                        <div className="text-xs text-zinc-400">
                            Status • {promo.status ?? 'N/A'}
                        </div>
                        <div className="text-xs text-zinc-400">
                            Catatan/Komentar :
                        </div>
                        <div className="text-xs text-zinc-400">
                            • {promo.admin_note ?? 'N/A'}
                        </div>
                        {promo.status !== "approved" && (<button
                            onClick={() => {
                                if (confirm('Yakin ingin menghapus laporan ini?')) {
                                    Inertia.delete(route('promotions.destroy', promo.id))
                                }
                            }}
                            className="mt-4 inline-block bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded shadow"
                        >
                            🗑 Hapus Laporan
                        </button>
                        )}
                        {promo.status !== "approved" && (
                            <button
                                onClick={() => openEditModal(promo)}
                                className="mt-2 inline-block bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-3 py-1 rounded shadow ml-2"
                            >
                                ✏️ Edit Laporan
                            </button>
                        )}

                    </div>
                ))}
            </div>
            {editing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-lg shadow-lg border border-zinc-600">
                        <h2 className="text-xl font-bold text-fuchsia-300 mb-4">Edit Laporan</h2>
                        <form onSubmit={handleEditSubmit} className="space-y-4 text-white">
                            <div>
                                <label className="block text-sm">Jenis Promosi</label>
                                <input
                                    type="text"
                                    value={editForm.promo_type}
                                    onChange={(e) => setEditForm({ ...editForm, promo_type: e.target.value })}
                                    className="w-full p-2 rounded bg-zinc-700 border border-zinc-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm">Deskripsi</label>
                                <textarea
                                    value={editForm.description}
                                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                    className="w-full p-2 rounded bg-zinc-700 border border-zinc-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm">Tanggal Promosi</label>
                                <input
                                    type="date"
                                    value={editForm.promo_date}
                                    onChange={(e) => setEditForm({ ...editForm, promo_date: e.target.value })}
                                    className="w-full p-2 rounded bg-zinc-700 border border-zinc-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm">Estimasi Trafik</label>
                                <input
                                    type="number"
                                    value={editForm.estimated_traffic}
                                    onChange={(e) => setEditForm({ ...editForm, estimated_traffic: e.target.value })}
                                    className="w-full p-2 rounded bg-zinc-700 border border-zinc-600"
                                />
                            </div>
                            <div className="flex justify-end space-x-2 pt-2">
                                <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 rounded bg-zinc-600">
                                    ❌ Batal
                                </button>
                                <button type="submit" className="px-4 py-2 rounded bg-green-600 hover:bg-green-700">
                                    ✅ Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    )
}
