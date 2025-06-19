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
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Kontrol Promosi Seluruh Outlet</h2>

            <a
                href={route('admin.promotions.export', data)}
                target="_blank"
                className="bg-green-600 text-white px-4 py-2 rounded inline-block"
            >
                Export Excel
            </a>


            <form onSubmit={handleFilter} className="flex flex-wrap gap-3 items-end mb-6">
                <div>
                    <label className="block text-sm font-medium">Outlet</label>
                    <select
                        value={data.outlet_id}
                        onChange={(e) => setData('outlet_id', e.target.value)}
                        className="border rounded p-2"
                    >
                        <option value="">Semua Outlet</option>
                        {outlets.map((outlet) => (
                            <option key={outlet.id} value={outlet.id}>
                                {outlet.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Dari Tanggal</label>
                    <input
                        type="date"
                        value={data.start_date}
                        onChange={(e) => setData('start_date', e.target.value)}
                        className="border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Sampai Tanggal</label>
                    <input
                        type="date"
                        value={data.end_date}
                        onChange={(e) => setData('end_date', e.target.value)}
                        className="border p-2 rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Terapkan Filter
                </button>
            </form>
            <div className="space-y-4">
                {promotions.map((promo) => (
                    <div key={promo.id} className="border rounded p-4 shadow">
                        <div className="mb-2">
                            <div className="font-semibold">{promo.promo_type}</div>
                            <div className="text-sm text-gray-600">
                                {promo.promo_date} • Trafik: {promo.estimated_traffic ?? 'N/A'} • {promo.outlet.name}
                            </div>
                            <div className="text-sm text-gray-800 mt-1">{promo.description}</div>
                            <div className="text-xs text-gray-400 mt-1">Dikirim oleh: {promo.user.name}</div>
                        </div>

                        {promo.photos.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                                {promo.photos.map((photo) => (
                                    <img
                                        key={photo.id}
                                        src={photo.path}
                                        alt="Foto promosi"
                                        className="rounded border object-cover w-full h-32"
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
                            className="mt-3 border-t pt-2 space-y-2"
                        >
                            <div>
                                <label className="block text-sm font-medium">Status</label>
                                <select name="status" defaultValue={promo.status} className="border rounded p-1">
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
                                    className="w-full border rounded p-2"
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-1 rounded"
                            >
                                Simpan Perubahan
                            </button>
                        </form>

                    </div>
                ))}
            </div>
        </div>
    )
}
