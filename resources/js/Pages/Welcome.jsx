// Versi kedua: posisi header dibalik (logo kiri, tombol kanan), style tetap modern dan Gen Z

import { Head, Link } from '@inertiajs/react';
import logoheader from '@assets/Assets/img/logo.png';
import gambar from '@assets/Assets/img/gambar.png';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gradient-to-br from-fuchsia-100 via-blue-100 to-white dark:from-zinc-900 dark:via-zinc-800 dark:to-black">
                {/* Header */}
                <header className="w-full flex items-center justify-between px-6 py-4 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-md sticky top-0 z-50">
                    {/* Kiri: logo + nama brand */}
                    <div className="flex items-center gap-2">
                        <img src={logoheader} alt="Brand Logo" className="h-8 w-8" />
                        <span className="text-lg font-bold text-blue-700 dark:text-blue-300">
                            My Kopi O!
                        </span>
                    </div>

                    {/* Kanan: tombol */}
                    <div className="flex gap-4 text-sm font-semibold">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="hover:text-blue-600 transition"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="hover:text-blue-600 transition">
                                    Login
                                </Link>
                                <Link href={route('register')} className="hover:text-fuchsia-600 transition">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </header>

                {/* Konten utama */}
                <main className="max-w-5xl mx-auto px-6 py-12">
                    {/* Konten 1: gambar + deskripsi */}
                    <section className="text-center mb-16">
                        <img
                            src={gambar}
                            alt="Gen Z Visual"
                            className="w-full max-h-[400px] object-cover object-[50%_17%] aspect-[16/7] rounded-2xl shadow-xl mb-6 hover:scale-105 transition-transform duration-500"
                        />
                        <p className="text-md text-zinc-600 dark:text-zinc-300">
                            Web App monitoring promo outlet.
                        </p>
                    </section>

                    {/* Konten 2: teks panjang */}
                    <section className="prose max-w-none dark:prose-invert prose-p:leading-loose prose-p:text-justify">
                        <p>
                            Aplikasi ini dirancang untuk mempermudah pencatatan laporan harian dan pengawasan promosi outlet F&B secara real-time. Melalui sistem berbasis web dan mobile, admin dapat mengelola data, melihat dokumentasi foto, serta memantau aktivitas setiap outlet dengan lebih efisien dan terpusat.
                        </p>
                    </section>
                </main>

                {/* Footer */}
                <footer className="bg-white dark:bg-zinc-900 border-t dark:border-zinc-800 py-10 px-6">
                    <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6 text-sm text-zinc-600 dark:text-zinc-300">
                        <div>
                            <h4 className="font-semibold mb-2 text-zinc-800 dark:text-white">Hubungi Kami</h4>
                            <p>Email: hello@kopio.id</p>
                            <p>Twitter: @mykopio_id</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-zinc-800 dark:text-white">Lokasi Kami</h4>
                            <p>Jl. Anak Muda Kreatif No. 12</p>
                            <p>Surabaya, Indonesia</p>
                        </div>
                    </div>
                    <div className="mt-6 text-center text-xs text-zinc-500">
                        MyKopi O! © 2025
                    </div>
                </footer>
            </div>
        </>
    );
}
