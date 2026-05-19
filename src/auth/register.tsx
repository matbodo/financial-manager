import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaMailBulk } from 'react-icons/fa';
import API from '../services/api';

export function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post('/register', {
                name,
                email,
                password
            });

            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/home');

        } catch (error) {
            alert('Erro ao registrar usuário. Email já pode estar em uso');
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-emerald-950 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-950">Registre-se</h1>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Nome"
                            className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 pr-11 text-gray-900 placeholder:text-gray-400 transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <FaUser className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>

                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email"
                            className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 pr-11 text-gray-900 placeholder:text-gray-400 transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FaMailBulk className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Senha"
                            className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 pr-11 text-gray-900 placeholder:text-gray-400 transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FaLock className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>

                    <div className="flex flex-col gap-3 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-emerald-600 accent-emerald-600" />
                            Lembre de mim
                        </label>
                    </div>

                    <button
                        className="h-12 w-full rounded-xl bg-emerald-600 px-5 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99]"
                        type="submit"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    )
}
