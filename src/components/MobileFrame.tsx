import React from 'react';
import { TabType } from '../types';
import { 
  Home, 
  Search, 
  PlusCircle, 
  Bell, 
  User, 
  Wifi, 
  Battery, 
  Signal, 
  PawPrint,
  Smartphone,
  Maximize2,
  Sparkles
} from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenRegister: () => void;
  unreadNotifsCount: number;
  isDeviceFrame: boolean;
  onToggleDeviceFrame: () => void;
  onQuickViewBuddy: () => void;
  onQuickViewFeed: () => void;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  activeTab,
  onTabChange,
  onOpenRegister,
  unreadNotifsCount,
  isDeviceFrame,
  onToggleDeviceFrame,
  onQuickViewBuddy,
  onQuickViewFeed,
}) => {
  return (
    <div className="min-h-screen bg-[#2A2927] flex flex-col items-center justify-center p-0 sm:p-4 text-[#3D3D3D]">
      {/* Top Prototype Presentation Control Bar */}
      <div className="w-full max-w-4xl px-4 py-2.5 mb-2 hidden sm:flex items-center justify-between text-xs text-[#D9D4CC]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7A9D8C] animate-pulse" />
          <span className="font-bold text-white tracking-wide">Protótipo Pet Encontrado</span>
          <span className="text-[#A39E96]">• Tema Natural Tones</span>
        </div>

        {/* Quick Screen Switches & View Toggle */}
        <div className="flex items-center gap-2">
          <div className="bg-[#3D3D3D] p-1 rounded-2xl flex items-center gap-1 border border-[#5C5C5C]/40">
            <button
              onClick={onQuickViewFeed}
              className="px-3 py-1 rounded-xl text-xs font-semibold hover:bg-white/10 text-[#F2EDE4] transition-colors"
            >
              📄 Tela 1: Lista / Busca
            </button>
            <button
              onClick={onQuickViewBuddy}
              className="px-3 py-1 rounded-xl text-xs font-semibold hover:bg-white/10 text-[#F2EDE4] transition-colors flex items-center gap-1"
            >
              <span>🐾 Tela 2: Detalhes Buddy</span>
            </button>
          </div>

          <button
            onClick={onToggleDeviceFrame}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#3D3D3D] hover:bg-[#4D4D4D] text-white rounded-2xl border border-[#5C5C5C]/40 transition-all text-xs font-bold"
          >
            {isDeviceFrame ? <Maximize2 className="w-3.5 h-3.5 text-[#E6B89C]" /> : <Smartphone className="w-3.5 h-3.5 text-[#E6B89C]" />}
            <span>{isDeviceFrame ? 'Modo Expandido' : 'Modo Celular'}</span>
          </button>
        </div>
      </div>

      {/* Main Container - Device Mockup or Expanded */}
      <div
        className={`w-full transition-all duration-300 ${
          isDeviceFrame
            ? 'max-w-[412px] h-[864px] max-h-[96vh] rounded-[48px] border-[10px] border-[#3D3D3D] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] ring-1 ring-white/10'
            : 'max-w-md md:max-w-2xl h-[92vh] rounded-[36px] border border-[#3D3D3D] shadow-2xl'
        } bg-[#FDFBF7] flex flex-col overflow-hidden relative`}
      >
        {/* iOS / Mobile Status Bar matching Natural Tones style */}
        <div className="pt-2.5 px-6 pb-1 bg-[#FDFBF7] flex items-center justify-between text-[#3D3D3D] z-40 select-none flex-shrink-0 text-xs font-bold">
          {/* Time */}
          <span className="font-bold text-xs tracking-tight pl-1 text-[#3D3D3D]">9:41</span>

          {/* Dynamic Island / Notch */}
          {isDeviceFrame && (
            <div className="w-24 h-4 bg-[#3D3D3D] rounded-full mx-auto -mt-0.5 flex items-center justify-end pr-2">
              <span className="w-2 h-2 rounded-full bg-[#7A9D8C]" />
            </div>
          )}

          {/* Status Icons */}
          <div className="flex items-center gap-1.5 text-[#3D3D3D] pr-1">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Screen Content */}
        <main className="flex-1 overflow-hidden relative bg-[#FDFBF7]">
          {children}
        </main>

        {/* Natural Tones Bottom Navigation Bar */}
        <div className="px-3 pb-3 pt-1 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7] to-transparent z-40">
          <nav 
            id="mobile-bottom-nav"
            className="bg-[#3D3D3D] rounded-[28px] px-3 py-2 shadow-2xl flex items-center justify-around select-none text-white border border-[#4A4A4A]"
          >
            {/* Início (Home) */}
            <button
              id="nav-tab-inicio"
              onClick={() => onTabChange('inicio')}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'inicio' ? 'text-white font-bold' : 'text-white/50 hover:text-white'
              }`}
            >
              <Home className={`w-5 h-5 ${activeTab === 'inicio' ? 'text-[#E6B89C]' : ''}`} />
              <span className="text-[10px] mt-0.5 font-medium">Início</span>
            </button>

            {/* Buscar / Mapa */}
            <button
              id="nav-tab-buscar"
              onClick={() => onTabChange('buscar')}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'buscar' ? 'text-white font-bold' : 'text-white/50 hover:text-white'
              }`}
            >
              <Search className={`w-5 h-5 ${activeTab === 'buscar' ? 'text-[#E6B89C]' : ''}`} />
              <span className="text-[10px] mt-0.5 font-medium">Buscar</span>
            </button>

            {/* Center Action Button: Anunciar / Registrar */}
            <button
              id="nav-tab-anunciar"
              onClick={onOpenRegister}
              className="flex flex-col items-center justify-center -mt-9 group cursor-pointer"
            >
              <div className="w-13 h-13 rounded-full bg-[#7A9D8C] group-hover:bg-[#688E7D] text-white flex items-center justify-center shadow-xl border-4 border-[#FDFBF7] transform transition group-hover:scale-105 group-active:scale-95">
                <PawPrint className="w-6 h-6 fill-white text-white" />
              </div>
              <span className="text-[10px] font-bold text-white/90 mt-0.5">Anunciar</span>
            </button>

            {/* Notificações */}
            <button
              id="nav-tab-notificacoes"
              onClick={() => onTabChange('notificacoes')}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'notificacoes' ? 'text-white font-bold' : 'text-white/50 hover:text-white'
              }`}
            >
              <Bell className={`w-5 h-5 ${activeTab === 'notificacoes' ? 'text-[#E6B89C]' : ''}`} />
              <span className="text-[10px] mt-0.5 font-medium">Avisos</span>
              {unreadNotifsCount > 0 && (
                <span className="absolute top-0 right-2 w-4 h-4 bg-[#E6B89C] text-[#3D3D3D] rounded-full text-[9px] flex items-center justify-center font-extrabold shadow-sm">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* Meu Perfil */}
            <button
              id="nav-tab-perfil"
              onClick={() => onTabChange('perfil')}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'perfil' ? 'text-white font-bold' : 'text-white/50 hover:text-white'
              }`}
            >
              <User className={`w-5 h-5 ${activeTab === 'perfil' ? 'text-[#E6B89C]' : ''}`} />
              <span className="text-[10px] mt-0.5 font-medium">Perfil</span>
            </button>
          </nav>
        </div>

        {/* iOS Bottom Bar indicator */}
        {isDeviceFrame && (
          <div className="h-3 bg-[#FDFBF7] flex items-center justify-center pb-1">
            <div className="w-32 h-1 bg-[#D9D4CC] rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};
