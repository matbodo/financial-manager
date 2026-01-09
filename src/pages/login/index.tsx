import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import './login.css';

export function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-950">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h1>Acesse o sistema</h1>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="E-mail"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Senha"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FaLock className="icon" />
                    </div>
                    <div className="recall-forget">
                        <label>
                            <input type="checkbox" />
                            Lembre de mim
                        </label>
                        <a href="#">Esqueci minha senha</a>
                    </div>
                    <button> Entrar </button>
                    <div className="signup-link">
                        Não tem uma conta? <a href="#">Registre-se</a>
                    </div>
                </form>
            </div>
        </div>
    )
}