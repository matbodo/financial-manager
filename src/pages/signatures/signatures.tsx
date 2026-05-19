import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog } from '../../molecules/confirmDialog';
import API from '../../services/api';

export function AssinaturasPage() {
    const [openForm, setOpenForm] = useState(false);
    const [signatureToDelete, setSignatureToDelete] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [signatureStorage, setSignatureStorage] = useState<Array<{ id: number; name: string; value: number; user_id: number }>>([]);
    const [value, setValue] = useState('');
    const [name, setName] = useState('');

    const userStorage = localStorage.getItem('user') || sessionStorage.getItem('user');
    const user = userStorage ? JSON.parse(userStorage) : null;
    const navigate = useNavigate();

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
                userId: user.id,
            })

            sessionStorage.setItem('signature', JSON.stringify(response.data));
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

    const handleRemove = async (id: number) => {
        await API.delete(`/assinaturas/${id}`);

        setSignatureStorage(signatureStorage.filter(item => item.id !== id))
    };

    useEffect(() => {
        async function getSignatures() {
            if (!user) return;

            const response = await API.get(`/assinaturas/${user.id}`);

            setSignatureStorage(response.data)
        }

        getSignatures();
    }, []);


    return (
        <>
            <div className="min-h-screen w-full bg-emerald-950 px-4 py-8">
                <div className="mx-auto min-h-screen w-full max-w-5xl">
                    <div className="mb-6">
                        <button className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:border-emerald-200 hover:text-emerald-700"
                            onClick={() => navigate('/home')}>
                            Voltar
                        </button>
                    </div>
                    <div className="flex flex-col items-center">
                        {openForm ? (
                            <button className="mt-4 flex min-h-32 w-full items-center justify-center rounded-2xl border border-dashed border-emerald-300 bg-white p-6 shadow-sm transition hover:border-emerald-500 hover:bg-emerald-50"
                                onClick={handleAddSignature}
                            >
                                <h2 className="text-center text-2xl font-bold text-emerald-700">
                                    + ADICIONAR ASSINATURAS
                                </h2>
                            </button>
                        ) : (
                            <div className="mt-4 flex w-full flex-col items-center justify-center rounded-2xl border border-emerald-900 bg-emerald-50 p-6 shadow-sm">
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
                            {signatureStorage.map((signature, index) => (
                                <div key={index} className="relative min-h-32 w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <div className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-red-50 text-red-700 transition hover:bg-red-100"
                                        onClick={() => handleOpenDelete(signature)}
                                    >
                                        <span className="text-base font-bold">X</span>
                                    </div>
                                    <div className="flex min-h-20 flex-col justify-center pr-12">
                                        <h2 className="text-2xl font-bold text-gray-950">{signature.name}</h2>
                                        <h3 className="mt-2 text-lg font-semibold text-emerald-700">R$ {signature.value}</h3>
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
                confirmLoading={isPending}
            />

        </>
    )
}
