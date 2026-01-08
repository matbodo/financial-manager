import React from 'react';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="w-screen min-h-screen bg-gray-950 flex">
            <div className="w-full max-w-7xl mx-auto bg-gray-700 min-h-screen px-10 py-6">
                <div className="flex flex-col items-center mt-10 gap-6">
                    <div className="mb-16">
                        <h1 className="text-white text-6xl font-bold text-center mb-8">RENDA ATUAL</h1>
                        <input
                            type="number"
                            placeholder="Renda Mensal"
                            className="w-full h-14 px-3 flex justify-items-center rounded-md font-bold text-3xl border border-gray-800 bg-gray-500 text-green-600 placeholder-gray-300"
                        />
                    </div>
                    <button className="rounded-xl border border-gray-600 w-full max-w-4xl h-44 bg-gray-800 hover:bg-gray-700 transition-colors"
                        onClick={() => navigate('/assinaturas')}>
                        <h2 className="text-white text-4xl text-center font-bold">ASSINATURAS</h2>
                    </button>

                    <button className="rounded-xl border border-gray-600 w-full max-w-4xl h-44 bg-gray-800 hover:bg-gray-700 transition-colors"
                        onClick={() => navigate('/gastos')}>
                        <h2 className="text-white text-4xl text-center font-bold">GASTOS</h2>
                    </button>

                    <button className="rounded-xl border border-gray-600 w-full max-w-4xl h-44 bg-gray-800 hover:bg-gray-700 transition-colors"
                        onClick={() => navigate('/investimentos')}>
                        <h2 className="text-white text-4xl text-center font-bold">INVESTIMENTOS</h2>
                    </button>
                </div>
            </div>
        </div>
    )
}