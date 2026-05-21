import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog } from '../../molecules/confirmDialog';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import API from '../../services/api';

type Expense = {
    id: number;
    name: string;
    value: number;
    user_id: number;
};

export function GastosPage() {
    const [expenseStorage, setExpenseStorage] = useState<Array<Expense>>([]);
    const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [openForm, setOpenForm] = useState(true);
    const [value, setValue] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate();
    const totalExpenses = expenseStorage.reduce((total, expense) => total + Number(expense.value), 0);

    const formatCurrency = (value: number) => {
        return Number(value).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };

    const handleAddExpense = () => {
        setOpenForm(false)
        setName('');
        setValue('');
    };

    const handleSaveExpense = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post('/gastos', {
                name,
                value: Number(value),
            })

            setExpenseStorage([...expenseStorage, response.data])
            setOpenForm(true);

        } catch (error) {
            alert('Preencha todos os campos.');
        }
    };

    const handleCancel = () => {
        setOpenForm(true);
        setName('');
        setValue('');
    };

    const handleOpenDelete = (expense) => [
        setExpenseToDelete(expense)
    ]

    const handleCancelDelete = () => {
        setExpenseToDelete(null);
    }

    const handleConfirmDelete = async () => {
        if (!expenseToDelete) return;

        try {
            setIsPending(true);

            await API.delete(`/gastos/${expenseToDelete.id}`);

            setExpenseStorage(
                expenseStorage.filter(item => item.id !== expenseToDelete.id)
            )

            setExpenseToDelete(null);
        } finally {
            setIsPending(false);
        }
    }

    useEffect(() => {
        async function getExpenses() {
            const response = await API.get(`/gastos`);

            setExpenseStorage(response.data)
        }

        getExpenses();
    }, []);


    return (
        <>
            <div className="min-h-screen w-full bg-emerald-950 px-4 py-8">
                <div className="mx-auto min-h-screen w-full max-w-5xl">
                    <div className="mb-6 flex items-center justify-between">
                        <button className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:border-emerald-600 hover:bg-emerald-900"
                            onClick={() => navigate('/home')}>
                            <FaArrowLeft />
                        </button>
                        <div className="text-right">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-200">Gastos</p>
                            <h1 className="text-2xl font-bold text-white">Controle mensal</h1>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <section className="grid w-full gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-5 shadow-sm">
                                <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Total mensal</p>
                                <strong className="mt-3 block text-3xl font-bold text-emerald-950">
                                    {formatCurrency(totalExpenses)}
                                </strong>
                            </div>
                            <div className="rounded-2xl border border-emerald-800 bg-emerald-900 p-5 shadow-sm">
                                <p className="text-sm font-bold uppercase tracking-wide text-emerald-200">Itens ativos</p>
                                <strong className="mt-3 block text-3xl font-bold text-emerald-50">
                                    {expenseStorage.length}
                                </strong>
                            </div>
                        </section>

                        {openForm ? (
                            <button className="mt-5 flex min-h-24 w-full items-center justify-center rounded-2xl border border-emerald-300 bg-emerald-50 p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-100 hover:shadow-md active:scale-[0.99] animate-[formIn_180ms_ease-out]"
                                onClick={handleAddExpense}
                            >
                                <h2 className="text-center text-2xl font-bold text-emerald-700">
                                    + ADICIONAR GASTO
                                </h2>
                            </button>
                        ) : (
                            <div className="mt-4 flex w-full flex-col items-center justify-center rounded-2xl border border-emerald-900 bg-emerald-50 p-6 shadow-sm animate-[formIn_180ms_ease-out]">
                                <div className="w-full space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Nome do gasto"
                                        className="h-12 w-full rounded-xl border border-emerald-700 bg-gray-50 px-4 text-gray-900 placeholder:text-gray-400 transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Valor mensal"
                                        className="h-12 w-full rounded-xl border border-emerald-700 bg-gray-50 px-4 text-gray-900 placeholder:text-gray-400 transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                        onChange={(e) => setValue(e.target.value)}
                                        value={value}
                                    />

                                    <button className="h-12 w-full rounded-xl bg-emerald-600 px-5 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99]"
                                        onClick={handleSaveExpense}
                                    >
                                        + ADICIONAR GASTO
                                    </button>
                                    <button className="h-12 w-full rounded-xl border border-red-200 bg-red-50 px-5 text-base font-semibold text-red-700 transition hover:bg-red-100 active:scale-[0.99]"
                                        onClick={handleCancel}
                                    >
                                        CANCELAR
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className="mt-8 flex w-full flex-col gap-4">
                            {expenseStorage.map((expense) => (
                                <div key={expense.id} className="relative w-full rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md">
                                    <div className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-red-700 transition hover:bg-red-100"
                                        onClick={() => handleOpenDelete(expense)}
                                    >
                                        <span className="text-base font-bold"><FaTrash /></span>
                                    </div>
                                    <div className="flex min-h-24 flex-col gap-4 pr-12 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Gasto</p>
                                            <h2 className="mt-1 text-2xl font-bold text-gray-950">{expense.name}</h2>
                                        </div>
                                        <div className="inline-flex w-fit rounded-xl bg-emerald-900 px-4 py-3 text-lg font-bold text-emerald-50">
                                            {formatCurrency(expense.value)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            <ConfirmDialog
                open={Boolean(expenseToDelete)}
                title="Cancelar Gasto"
                message="Tem certeza que deseja cancelar este gasto?"
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                confirmMessage="Excluir"
                confirmLoading={isPending}
            />

        </>
    )
}
