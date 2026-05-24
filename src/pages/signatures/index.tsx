import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog } from '../../molecules/confirmDialog';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import API from '../../services/api';

type Signature = {
    id: number;
    name: string;
    value: number;
    user_id: number;
};

const formatCurrency = (value: number) => {
    return Number(value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
};

export function AssinaturasPage() {
    const [signatureStorage, setSignatureStorage] = useState<Array<Signature>>([]);
    const [signatureToDelete, setSignatureToDelete] = useState<Signature | null>(null);
    const [billingDay, setBillingDay] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [openForm, setOpenForm] = useState(true);
    const [value, setValue] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate();
    const totalSignatures = signatureStorage.reduce((total, signature) => total + Number(signature.value), 0);

    const handleAddSignature = () => {
        setOpenForm(false)
        setName('');
        setValue('');
    };

    const handleSaveSignature = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post('/assinaturas', {
                name,
                value: Number(value),
                billingDay: Number(billingDay),
            })

            setSignatureStorage([...signatureStorage, response.data])
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

    const handleOpenDelete = (signature) => [
        setSignatureToDelete(signature)
    ]

    const handleCancelDelete = () => {
        setSignatureToDelete(null);
    }

    const handleConfirmDelete = async () => {
        if (!signatureToDelete) return;

        try {
            setIsPending(true);

            await API.delete(`/assinaturas/${signatureToDelete.id}`);

            setSignatureStorage(
                signatureStorage.filter(item => item.id !== signatureToDelete.id)
            )

            setSignatureToDelete(null);
        } finally {
            setIsPending(false);
        }
    }

    useEffect(() => {
        async function getSignatures() {
            const response = await API.get(`/assinaturas`);

            setSignatureStorage(response.data)
        }

        getSignatures();
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
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-200">Assinaturas</p>
                            <h1 className="text-2xl font-bold text-white">Controle mensal</h1>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <section className="grid w-full gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-5 shadow-sm">
                                <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Total mensal</p>
                                <strong className="mt-3 block text-3xl font-bold text-emerald-950">
                                    {formatCurrency(totalSignatures)}
                                </strong>
                            </div>
                            <div className="rounded-2xl border border-emerald-800 bg-emerald-900 p-5 shadow-sm">
                                <p className="text-sm font-bold uppercase tracking-wide text-emerald-200">Itens ativos</p>
                                <strong className="mt-3 block text-3xl font-bold text-emerald-50">
                                    {signatureStorage.length}
                                </strong>
                            </div>
                        </section>

                        {openForm ? (
                            <button className="mt-5 flex min-h-24 w-full items-center justify-center rounded-2xl border border-emerald-300 bg-emerald-50 p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-100 hover:shadow-md active:scale-[0.99]"
                                onClick={handleAddSignature}
                            >
                                <h2 className="text-center text-2xl font-bold text-emerald-700">
                                    + ADICIONAR ASSINATURA
                                </h2>
                            </button>
                        ) : (
                            <div className="mt-4 flex w-full flex-col items-center justify-center rounded-2xl border border-emerald-900 bg-emerald-50 p-6 shadow-sm animate-[formIn_180ms_ease-out]">
                                <div className="w-full space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Nome da assinatura"
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
                                    <input
                                        type="number"
                                        min="1"
                                        max="31"
                                        className="h-12 w-full rounded-xl border border-emerald-700 bg-gray-50 px-4 text-gray-900 placeholder:text-gray-400 transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                        placeholder="Dia de cobrança"
                                        onChange={(e) => setBillingDay(e.target.value)}
                                        value={billingDay}
                                    />

                                    <button className="h-12 w-full rounded-xl bg-emerald-600 px-5 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99]"
                                        onClick={handleSaveSignature}
                                    >
                                        + ADICIONAR ASSINATURA
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
                            {signatureStorage.map((signature) => (
                                <div key={signature.id} className="relative w-full rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md">
                                    <div className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-red-700 transition hover:bg-red-100"
                                        onClick={() => handleOpenDelete(signature)}
                                    >
                                        <span className="text-base font-bold"><FaTrash /></span>
                                    </div>
                                    <div className="flex min-h-20 flex-col gap-4 pr-12 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Assinatura ativa</p>
                                            <h2 className="mt-1 text-2xl font-bold text-gray-950">{signature.name}</h2>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <div className="inline-flex w-40 rounded-lg bg-emerald-900 px-4 py-2 text-lg font-bold text-emerald-50">
                                                {signature.billing_day}º dia do mês
                                            </div>
                                            <div className="inline-flex w-40 rounded-lg bg-emerald-900 px-4 py-2 text-lg font-bold text-emerald-50">
                                                {formatCurrency(signature.value)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            <ConfirmDialog
                open={Boolean(signatureToDelete)}
                title="Cancelar Assinatura"
                message="Tem certeza que deseja cancelar esta assinatura?"
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                confirmMessage="Excluir"
                confirmLoading={isPending}
            />

        </>
    )
}
