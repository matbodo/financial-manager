import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaCheck, FaSignOutAlt } from 'react-icons/fa';
import { ConfirmDialog } from '../../molecules/confirmDialog';
import API from '../../services/api';

export function HomePage() {
    const navigate = useNavigate();
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const [income, setIncome] = useState('');
    const [total, setTotal] = useState({
        assinaturas: 0,
        gastos: 0,
        investimentos: 0,
        totalGeral: 0,
    });

    const formatCurrency = (value: number) => {
        return Number(value).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };

    const userStorage =
        localStorage.getItem('user') || sessionStorage.getItem('user');
    const user = userStorage ? JSON.parse(userStorage) : null;

    const handleIncomeChange = async () => {
        try {
            const response = await API.patch(`/usuarios/renda`, {
                income: Number(income),
            })

            setIncome(String(response.data.income));
        } catch (error) {
            alert('Erro ao salvar renda.')
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');

        setLogoutDialogOpen(false);
        navigate('/login');
    }

    const handleOpenLogout = () => [
        setLogoutDialogOpen(true)
    ]

    const handleCancelLogout = () => {
        setLogoutDialogOpen(false);
    }

    useEffect(() => {
        async function totalResponse() {
            if (!user) return;

            const response = await API.get(`/resumo`);
            setTotal(response.data);
            setIncome(String(response.data.income));
        }

        totalResponse();
    }, [])

    return (
        <>
            <div className="flex min-h-screen w-full items-center justify-center bg-emerald-950 px-4 py-8">
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
                    <section className="mb-3 grid gap-4 rounded-2xl border bg-emerald-50 p-5 shadow-sm sm:grid-cols-3 sm:p-6">
                        <div className="rounded-xl border border-emerald-700 bg-white p-5 shadow-sm">
                            <h1 className="text-sm font-bold uppercase tracking-wide text-emerald-700">RENDA ATUAL</h1>
                            <div className=" relative mt-4">
                                <input
                                    type="number"
                                    value={income}
                                    onChange={(e) => setIncome(e.target.value)}
                                    className="h-14 w-full rounded-xl border border-emerald-700 bg-emerald-50 px-4 text-2xl font-bold text-emerald-700 transition placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                />

                                <button
                                    type="button"
                                    onClick={handleIncomeChange}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-emerald-600 px-3 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                                >
                                    <FaCheck />
                                </button>
                            </div>
                        </div>

                        <div className="rounded-xl border border-emerald-200 bg-emerald-600 p-5 shadow-sm">
                            <h1 className="text-sm font-bold uppercase tracking-wide text-emerald-200">GASTO TOTAL</h1>
                            <div className="mt-4 flex h-14 items-center rounded-xl border border-emerald-200 bg-emerald-700 px-4">
                                <span
                                    className="text-2xl font-bold text-emerald-200">
                                    {formatCurrency(total.totalGeral)}
                                </span>
                            </div>
                        </div>

                        <div className="rounded-xl border border-emerald-300 bg-emerald-900 p-5 shadow-sm">
                            <h1 className="text-sm font-bold uppercase tracking-wide text-emerald-500">SALDO DISPONÍVEL</h1>
                            <div className="mt-4 flex h-14 items-center rounded-xl border border-emerald-500 bg-emerald-950 px-4">
                                <span
                                    className="text-2xl font-bold text-emerald-500">
                                    {formatCurrency(income ? income - total.totalGeral : 0)}
                                </span>
                            </div>
                        </div>

                    </section>

                    <button className="flex min-h-28 w-full items-center justify-between gap-4 rounded-2xl border border-emerald-700 bg-emerald-50 p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md"
                        onClick={() => navigate('/assinaturas')}>
                        <h2 className="text-2xl font-bold text-emerald-700">ASSINATURAS</h2>
                        <span
                            className="shrink-0 rounded-xl bg-emerald-900 px-4 py-3 text-lg font-bold text-emerald-100">
                            TOTAL: {formatCurrency(total.assinaturas)}
                        </span>
                    </button>

                    <button className="flex min-h-28 w-full items-center justify-between gap-4 rounded-2xl border border-emerald-700 bg-emerald-50 p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md"
                        onClick={() => navigate('/gastos')}>
                        <h2 className="text-2xl font-bold text-emerald-700">GASTOS</h2>
                        <span
                            className="shrink-0 rounded-xl bg-emerald-900 px-4 py-3 text-lg font-bold text-emerald-100">
                            TOTAL: {formatCurrency(total.gastos)}
                        </span>
                    </button>

                    <button className="flex min-h-28 w-full items-center justify-between gap-4 rounded-2xl border border-emerald-700 bg-emerald-50 p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md"
                        onClick={() => navigate('/investimentos')}>
                        <h2 className="text-2xl font-bold text-emerald-700">INVESTIMENTOS</h2>
                        <span
                            className="shrink-0 rounded-xl bg-emerald-900 px-4 py-3 text-lg font-bold text-emerald-100">
                            TOTAL: {formatCurrency(total.investimentos)}
                        </span>
                    </button>
                </div>
                <button
                    className="fixed  bottom-4 right-4 px-4 py-2 text-base font-bold text-red-600 hover:-translate-y-0.5 transition"
                    onClick={handleOpenLogout}
                >
                    <FaSignOutAlt />
                </button>
            </div>
            <ConfirmDialog
                open={Boolean(logoutDialogOpen)}
                title="Sair do sistema"
                message="Tem certeza que deseja sair do sistema?"
                confirmMessage="Sair"
                onCancel={handleCancelLogout}
                onConfirm={handleLogout}
            />

        </>
    )
}
