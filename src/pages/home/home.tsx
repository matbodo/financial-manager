import React from 'react';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-emerald-950 px-4 py-8 items-center justify-center flex">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
                <section className="rounded-2xl border border-emerald-700 bg-emerald-50 p-6 mb-5 shadow-sm">
                    <h1 className="text-3xl font-bold tracking-tight text-emerald-700">RENDA ATUAL</h1>
                    <div className="mt-5">
                        <input
                            type="number"
                            className="h-14 w-full rounded-xl border border-emerald-950 bg-gray-50 px-4 text-2xl font-bold text-emerald-700 transition placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100 sm:max-w-sm"
                        />
                    </div>
                </section>

                <button className="flex min-h-32 w-full items-center justify-between rounded-2xl border border-emerald-700 bg-emerald-50  p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md"
                    onClick={() => navigate('/assinaturas')}>
                    <h2 className="text-2xl font-bold text-emerald-700">ASSINATURAS</h2>
                </button>

                <button className="flex min-h-32 w-full items-center justify-between rounded-2xl border border-emerald-700 bg-emerald-50  p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md"
                    onClick={() => navigate('/gastos')}>
                    <h2 className="text-2xl font-bold text-emerald-700">GASTOS</h2>
                </button>

                <button className="flex min-h-32 w-full items-center justify-between rounded-2xl border border-emerald-700 bg-emerald-50  p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md"
                    onClick={() => navigate('/investimentos')}>
                    <h2 className="text-2xl font-bold text-emerald-700">INVESTIMENTOS</h2>
                </button>
            </div>

        </div>
    )
}
