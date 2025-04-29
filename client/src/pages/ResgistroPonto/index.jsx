import React from "react";
import { LogOut, Camera } from "lucide-react";

const MobileCheckin = ({ userName = "Enivander" }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="w-full flex items-center justify-between p-4 shadow-md bg-white">
        <div className="flex items-center gap-2">
          <span className="text-blue-700 font-semibold text-base">Olá, {userName}</span>
        </div>
        <button className="text-blue-700">
          <LogOut size={24} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <button className="w-40 h-40 rounded-xl border border-blue-600 flex items-center justify-center">
          <Camera size={70} strokeWidth={1.5} className="text-blue-600" />
        </button>
        <p className="mt-6 text-gray-600 text-sm">
          Toque no ícone para registrar seu ponto com segurança.
        </p>
        <div className="mt-10 w-full max-w-xs">
          <p className="text-xs text-gray-400">
            Último ponto registrado: 28/04/2025 - 08:14
          </p>
          <p className="text-xs text-gray-400">
            Status: Aguardando novo registro
          </p>
        </div>
      </main>
    </div>
  );
};

export default MobileCheckin;
