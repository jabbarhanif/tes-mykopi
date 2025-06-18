import React from 'react'
import { Link, usePage } from '@inertiajs/react'
import { useForm } from '@inertiajs/react'

export default function Index() {
    // const { promotions } = usePage().props
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
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Riwayat Laporan Promosi</h2>
                <Link
                    href={route('promotions.create')}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    + Laporan Baru
                </Link>
            </div>

            <form onSubmit={handleFilter} className="flex flex-wrap gap-2 items-end mb-4">
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

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Terapkan Filter
                </button>
            </form>


            {promotions.length === 0 && (
                <p className="text-gray-500">Belum ada laporan.</p>
            )}

            <div className="space-y-4">
                {promotions.map((promo) => (
                    <div key={promo.id} className="border rounded p-4 shadow-sm">
                        <div className="mb-2">
                            <div className="font-semibold">{promo.promo_type}</div>
                            <div className="text-sm text-gray-600">
                                {promo.promo_date} • Trafik: {promo.estimated_traffic ?? 'N/A'}
                            </div>
                            <div className="text-sm text-gray-800 mt-1">{promo.description}</div>
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
                    </div>
                ))}
            </div>
        </div>
    )
}
