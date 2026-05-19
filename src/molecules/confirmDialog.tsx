// import { Button } from '@/shared/ui/atoms/Button/Button'

export interface ConfirmDialogProps {
    open: boolean
    title: string
    message: string
    onConfirm: () => void
    onCancel: () => void
    confirmLoading?: boolean
}

export function ConfirmDialog({
    open,
    title,
    message,
    onConfirm,
    onCancel,
    confirmLoading,
}: ConfirmDialogProps) {
    if (!open) {
        return null
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
            <div className="w-full max-w-md rounded-lg bg-white shadow-lg animate-[dialogIn_180ms_ease-out]">
                <div className="p-6">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
                    <p className="mb-6 text-gray-600">{message}</p>
                    <div className="flex justify-end gap-3">
                        <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100"
                            onClick={onCancel} disabled={confirmLoading}>
                            Cancelar
                        </button>
                        <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-700"
                            onClick={onConfirm} disabled={confirmLoading}>
                            Excluir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
