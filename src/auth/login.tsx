import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import API from '../services/api';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post('/login', {
                email,
                password
            });

            const storage = rememberMe ? localStorage : sessionStorage;
            storage.setItem('token', response.data.token);
            storage.setItem('user', JSON.stringify(response.data.user));

            navigate('/home');

        } catch (error) {
            alert('Email ou senha incorretos. ');
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-emerald-950 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-950">Acesse o sistema</h1>
                    </div>

                    <div className="relative">
                        <input
                            type="email"
                            placeholder="E-mail"
                            className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 pr-11 text-gray-900 placeholder:text-gray-400 transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FaUser className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
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
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-emerald-600 accent-emerald-600" />
                            Lembre de mim
                        </label>
                        <a href="#" className="font-medium text-emerald-700 transition hover:text-emerald-800">Esqueci minha senha</a>
                    </div>

                    <button
                        className="h-12 w-full rounded-xl bg-emerald-600 px-5 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99]"
                        type="submit"
                    >
                        Entrar
                    </button>

                    <div className="text-center text-sm text-gray-600">
                        Não tem uma conta? {' '}
                        <Link
                            to="/register"
                            className="font-semibold text-emerald-700 transition hover:text-emerald-800"
                        >
                            Registre-se
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
