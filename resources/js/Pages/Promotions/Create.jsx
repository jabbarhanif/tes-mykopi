import { useForm } from '@inertiajs/react'
import React from 'react'

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        promo_type: '',
        description: '',
        promo_date: '',
        estimated_traffic: '',
        photos: [],
    })

    const handleFileChange = (e) => {
        setData('photos', Array.from(e.target.files))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        post(route('promotions.store'), {
            onSuccess: () => reset(),
        })
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Laporan Promosi Harian</h2>

            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                <div>
                    <label className="block mb-1 font-medium">Jenis Promosi</label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={data.promo_type}
                        onChange={(e) => setData('promo_type', e.target.value)}
                    />
                    {errors.promo_type && <div className="text-red-600 text-sm">{errors.promo_type}</div>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Deskripsi</label>
                    <textarea
                        className="w-full border p-2 rounded"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    ></textarea>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Tanggal Promosi</label>
                    <input
                        type="date"
                        className="w-full border p-2 rounded"
                        value={data.promo_date}
                        onChange={(e) => setData('promo_date', e.target.value)}
                    />
                    {errors.promo_date && <div className="text-red-600 text-sm">{errors.promo_date}</div>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Perkiraan Jumlah Pengunjung</label>
                    <input
                        type="number"
                        className="w-full border p-2 rounded"
                        value={data.estimated_traffic}
                        onChange={(e) => setData('estimated_traffic', e.target.value)}
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Upload Foto (max 3)</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {errors.photos && <div className="text-red-600 text-sm">{errors.photos}</div>}
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    disabled={processing}
                >
                    Kirim Laporan
                </button>
            </form>
        </div>
    )
}
