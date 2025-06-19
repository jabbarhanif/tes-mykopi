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
        <div className="max-w-2xl mx-auto p-6 bg-zinc-900 text-white min-h-screen">
            <h2 className="text-2xl font-extrabold text-fuchsia-400 mb-6">📝 Laporan Promosi Harian</h2>

            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                <div className="rounded-xl p-4 bg-white/10 backdrop-blur-md border border-white/10">
                    <label className="block mb-2 font-semibold text-sm">Jenis Promosi</label>
                    <input
                        type="text"
                        className="w-full rounded px-3 py-2 bg-zinc-800 border border-zinc-600 text-sm"
                        value={data.promo_type}
                        onChange={(e) => setData('promo_type', e.target.value)}
                    />
                    {errors.promo_type && <div className="text-red-400 text-sm mt-1">{errors.promo_type}</div>}
                </div>

                <div className="rounded-xl p-4 bg-white/10 backdrop-blur-md border border-white/10">
                    <label className="block mb-2 font-semibold text-sm">Deskripsi</label>
                    <textarea
                        className="w-full rounded px-3 py-2 bg-zinc-800 border border-zinc-600 text-sm"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    ></textarea>
                </div>

                <div className="rounded-xl p-4 bg-white/10 backdrop-blur-md border border-white/10">
                    <label className="block mb-2 font-semibold text-sm">Tanggal Promosi</label>
                    <input
                        type="date"
                        className="w-full rounded px-3 py-2 bg-zinc-800 border border-zinc-600 text-sm"
                        value={data.promo_date}
                        onChange={(e) => setData('promo_date', e.target.value)}
                    />
                    {errors.promo_date && <div className="text-red-400 text-sm mt-1">{errors.promo_date}</div>}
                </div>

                <div className="rounded-xl p-4 bg-white/10 backdrop-blur-md border border-white/10">
                    <label className="block mb-2 font-semibold text-sm">Perkiraan Jumlah Pengunjung</label>
                    <input
                        type="number"
                        className="w-full rounded px-3 py-2 bg-zinc-800 border border-zinc-600 text-sm"
                        value={data.estimated_traffic}
                        onChange={(e) => setData('estimated_traffic', e.target.value)}
                    />
                </div>

                <div className="rounded-xl p-4 bg-white/10 backdrop-blur-md border border-white/10">
                    <label className="block mb-2 font-semibold text-sm">Upload Foto (max 3)</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="text-sm text-white"
                    />
                    {errors.photos && <div className="text-red-400 text-sm mt-1">{errors.photos}</div>}
                </div>

                <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 transition text-white px-6 py-2 rounded shadow disabled:opacity-50"
                    disabled={processing}
                >
                    🚀 Kirim Laporan
                </button>
            </form>
        </div>
    )
}
