import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logoaddtime from "../../assets/logoaddb.svg"; // ajuste o caminho conforme seu projeto
import Imagegoogle from "../../assets/google.svg";

const FloatingInput = ({ type, placeholder, value, setValue }) => {
    const [focus, setFocus] = useState(false);

   return (
        <div className="relative w-full mb-4">
            <motion.label
                initial={{ y: "50%", scale: 1.1, opacity: 0.9 }}
                animate={{
                    y: value || focus ? "-10px" : "50%",
                    scale: value || focus ? 0.85 : 1.2,
                    opacity: 1,
                }}
                transition={{ duration: 0.1 }}
                className={`absolute left-3 transition-all ${
                    value || focus
                        ? "text-blue-500 align-text-top top-2"
                        : "text-gray-400 text-sm top-1/2 -translate-y-6"
                }`}
            >
                {placeholder}
            </motion.label>
            <input
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                className="w-full px-3 pt-5 pb-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
        </div>
    );
};

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <motion.div
            className="flex h-screen items-center justify-center bg-gray-50"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl">
                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <img src={Logoaddtime} alt="Logo AddTime" className="w-32 h-auto" />
                </div>

                {/* Título */}
                <h2 className="text-2xl font-light text-center mb-6 text-gray-700">Bem-vindo</h2>

                {/* Login com Google */}
                <div className="flex flex-col space-y-4 mb-6">
                    <button className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg bg-white shadow-sm hover:bg-gray-100 transition-all">
                        <img src={Imagegoogle} className="w-6 h-6 mr-3" alt="Google" />
                        <span className="text-gray-700 font-medium">Login com Google</span>
                    </button>
                </div>

                {/* Divisor */}
                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-2 text-gray-400">ou</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Formulário */}
                <form className="flex flex-col">
                    <FloatingInput type="email" placeholder="Email" value={email} setValue={setEmail} />
                    <FloatingInput type="password" placeholder="Senha" value={password} setValue={setPassword} />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-md mt-2 hover:bg-blue-600 transition-all"
                    >
                        Entrar
                    </button>
                </form>

                {/* Cadastro */}
                <p className="text-center text-gray-600 text-sm mt-4">
                    Ainda não tem conta?{" "}
                    <button
                        onClick={() => navigate("/register")}
                        className="text-blue-500 hover:underline ml-1"
                    >
                        Cadastrar
                    </button>
                </p>

                {/* Termos */}
                <p className="text-center text-gray-400 text-xs mt-2">
                    Ao se cadastrar, você aceita nossos{" "}
                    <a href="#" className="text-blue-400 hover:underline">Termos de Serviço</a> e{" "}
                    <a href="#" className="text-blue-400 hover:underline">Política de Privacidade</a>.
                </p>
            </div>
        </motion.div>
    );
};

export default Login;
