import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Clock, FileText, Settings, Menu } from "lucide-react";
import logo from "../../assets/logoaddbranco.svg";

const Dashboard = ({ userName = "Enivander" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting("Bom dia");
    } else if (hours < 18) {
      setGreeting("Boa tarde");
    } else {
      setGreeting("Boa noite");
    }
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-50 to-white overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-full w-64 bg-gradient-to-br from-blue-500 to-blue-500 text-white py-8 px-6 shadow-xl flex flex-col justify-between rounded-tr-3xl rounded-br-3xl z-50 lg:relative lg:translate-x-0"
      >
        <div>
          <img src={logo} alt="Logo AddTime" className="w-36 h-auto mb-8 mt-12" />
          <nav className="flex flex-col gap-4">
            <SidebarItem icon={<Home size={20} />} label="Dashboard" />
            <SidebarItem icon={<Clock size={20} />} label="Marcar Ponto" />
            <SidebarItem icon={<FileText size={20} />} label="Relatórios" />
            <SidebarItem icon={<Settings size={20} />} label="Configurações" />
          </nav>
        </div>
        <div className="text-sm text-blue-100">© 2025 AddTime</div>
      </motion.aside>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 text-white z-50 lg:hidden"
      >
        <Menu size={28} />
      </button>

      {/* Main Content */}
      <main
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen && window.innerWidth >= 1024 ? "ml-64" : "ml-0"
        } p-6 md:p-10`}
      >
        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {greeting}, {userName}!
        </motion.h2>
        <motion.p
          className="text-gray-600"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Use o menu lateral para navegar pelas funcionalidades.
        </motion.p>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label }) => (
  <motion.a
    href="#"
    whileHover={{ scale: 1.05, x: 5 }}
    className="flex items-center gap-3 text-white text-base py-2 px-3 rounded-lg hover:bg-blue-700 transition-all"
  >
    {icon}
    <span>{label}</span>
  </motion.a>
);

export default Dashboard;
