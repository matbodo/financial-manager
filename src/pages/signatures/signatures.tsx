import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function AssinaturasPage() {
    const [openForm, setOpenForm] = useState(false);
    const [signatureStorage, setSignatureStorage] = useState<Array<{ name: string; value: string }>>([]);
    const [price, setPrice] = useState('');
    const [name, setName] = useState('');

    const handleAddSignature = () => {
        setOpenForm(false)
        setName('');
        setPrice('');
    };

    const handleSaveSignature = () => {
        setSignatureStorage([...signatureStorage, { name: name, value: price }])
        setOpenForm(true);
    };

    const handleCancel = () => {
        setOpenForm(true);
        setName('');
        setPrice('');
    };

    const handleRemove = (indexToRemove) => {
        const uptadeSignature = signatureStorage.filter((_, index) => index !== indexToRemove);
        setSignatureStorage(uptadeSignature);
    }

    const navigate = useNavigate();

    useEffect(() => {
        window.localStorage.setItem('signaturesList', JSON.stringify(signatureStorage));
    }, [signatureStorage]);


    return (
        <div className="w-screen min-h-screen bg-gray-950 flex">
            <div className="w-full max-w-7xl mx-auto bg-gray-700 min-h-screen px-10 py-6">
                <div>
                    <button className="flex top-0 left-0 items-center justify-center w-auto h-auto rounded-md bg-gray-800  cursor-pointer hover:bg-gray-900 transition-colors"
                        onClick={() => navigate('/home')}>
                        <h2 className="text-white text-4xl text-center font-bold">Voltar</h2>
                    </button>
                </div>
                <div className="flex flex-col items-center">
                    {openForm ? (
                        <button className="rounded-xl border border-gray-600 w-full max-w-4xl h-44 bg-gray-800 mt-10 hover:bg-gray-700 transition-colors"
                            onClick={handleAddSignature}
                        >
                            <h2 className="text-white text-4xl text-center font-bold">
                                + ADICIONAR ASSINATURAS
                            </h2>
                        </button>
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-600 w-full max-w-4xl h-auto bg-gray-800 mt-6 p-6">
                            <div className="w-full space-y-4">
                                <input
                                    type="text"
                                    placeholder="Nome da assinatura"
                                    className="w-full h-14 rounded-md border border-gray-600 bg-gray-500 text-white px-3 placeholder-gray-300"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                                <input
                                    type="text"
                                    placeholder="Valor mensal"
                                    className="w-full h-14 rounded-md border border-gray-600 bg-gray-500 text-white px-3 placeholder-gray-300"
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price}
                                />

                                <button className="rounded-xl border border-gray-600 w-full h-14 bg-green-600! hover:bg-green-700! transition-colors"
                                    onClick={handleSaveSignature}
                                >
                                    <h2 className="text-white text-2xl text-center font-bold">
                                        + ADICIONAR ASSINATURA
                                    </h2>
                                </button>
                                <button className="rounded-xl border border-gray-600 w-full h-14 bg-red-700! hover:bg-red-800! transition-colors"
                                    onClick={handleCancel}
                                >
                                    <h2 className="text-white text-2xl text-center font-bold">
                                        CANCELAR
                                    </h2>
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="w-full max-w-4xl mt-10 flex flex-col gap-4">
                        {signatureStorage.map((signature, index) => (
                            <div key={index} className="rounded-xl border border-gray-600 w-full h-44 bg-gray-800 p-6 relative">
                                <div className="absolute top-0 right-0 flex items-center justify-center w-10 h-10 rounded-md bg-red-800  cursor-pointer hover:bg-red-900 transition-colors"
                                    onClick={() => handleRemove(index)}
                                >
                                    <span className="text-white font-bold text-xl">X</span>
                                </div>
                                <div className="flex flex-col items-center justify-center h-full">
                                    <h2 className="text-white text-4xl text-center font-bold">{signature.name}</h2>
                                    <h3 className="text-gray-300 text-2xl text-center font-medium mt-2">R$ {signature.value}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}