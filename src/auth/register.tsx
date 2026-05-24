import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaMailBulk, FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import API from '../services/api';

export function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post('/register', {
                name,
                email,
                password
            });
            const storage = rememberMe ? localStorage : sessionStorage;
            storage.setItem('token', response.data.token);
            storage.setItem('user', JSON.stringify(response.data.user));
            navigate('/home');

        } catch (error) {
            alert('Erro ao registrar usuário. Verifique os dados e tente novamente.');
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-emerald-950 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-950">Registre-se</h1>
                    </div>

                    <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-left text-sm text-amber-900">
                        <FaExclamationTriangle className="mt-0.5 shrink-0 text-amber-600" />
                        <p>
                            Este projeto está em desenvolvimento para fins de portfólio.
                            Não utilize dados reais ou informações sensíveis. <br />
                            Estamos trabalhando para garantir a segurança, mas recomendamos cautela ao compartilhar informações pessoais.
                        </p>
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
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-emerald-600 accent-emerald-600"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            Lembre de mim
                        </label>
                    </div>

                    <button
                        className="h-12 w-full rounded-xl bg-emerald-600 px-5 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99]"
                        type="submit"
                    >
                        Registre-se
                    </button>

                    <div className="text-center text-sm text-gray-600">
                        Já tem uma conta? {' '}
                        <Link
                            to="/login"
                            className="font-semibold text-emerald-700 transition hover:text-emerald-800"
                        >
                            Entrar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
