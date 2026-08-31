import React from 'react';
import { NotificationItem, Pet } from '../types';
import { Bell, CheckCheck, Sparkles, AlertCircle, Eye, ArrowRight, ShieldCheck } from 'lucide-react';
import { PetLogo } from './PetLogo';

interface NotificationsScreenProps {
  notifications: NotificationItem[];
  pets: Pet[];
  onSelectPet: (pet: Pet) => void;
  onMarkAllAsRead: () => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  notifications,
  pets,
  onSelectPet,
  onMarkAllAsRead,
}) => {
  return (
    <div id="notifications-screen-container" className="flex flex-col h-full bg-[#FDFBF7] overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EAE7E2] px-4 py-3 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#EBF2EE] text-[#7A9D8C] rounded-full flex items-center justify-center">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-bold text-[#3D3D3D] text-base">Notificações</h2>
            <p className="text-[11px] text-[#8A8A8A]">Alertas de avistamentos e pets na região</p>
          </div>
        </div>

        <button
          onClick={onMarkAllAsRead}
          className="text-xs font-semibold text-[#7A9D8C] hover:text-[#5F8271] flex items-center gap-1 p-1 cursor-pointer"
        >
          <CheckCheck className="w-3.5 h-3.5" />
          <span>Lidas</span>
        </button>
      </header>

      {/* List */}
      <div className="p-4 space-y-3 pb-24">
        {notifications.length === 0 ? (
          <div className="bg-white rounded-[28px] p-8 text-center border border-[#F2EDE4] shadow-sm space-y-2">
            <Bell className="w-8 h-8 text-[#D9D4CC] mx-auto" />
            <h3 className="font-bold text-[#3D3D3D] text-sm">Sem novas notificações</h3>
            <p className="text-xs text-[#8A8A8A]">Você receberá alertas quando houver avistamentos perto de você.</p>
          </div>
        ) : (
          notifications.map((notif) => {
            const linkedPet = notif.petId ? pets.find(p => p.id === notif.petId) : undefined;

            return (
              <div
                key={notif.id}
                onClick={() => {
                  if (linkedPet) onSelectPet(linkedPet);
                }}
                className={`p-3.5 rounded-[24px] border transition-all cursor-pointer ${
                  notif.read
                    ? 'bg-white border-[#F2EDE4] shadow-xs'
                    : 'bg-[#EBF2EE] border-[#7A9D8C]/40 shadow-sm'
                }`}
              >
                <div className="flex gap-3 items-start">
                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 text-sm ${
                    notif.type === 'sighting'
                      ? 'bg-[#FDF4EE] text-[#E6B89C] border border-[#E6B89C]/30'
                      : notif.type === 'alert'
                      ? 'bg-[#FFEECC] text-[#B8860B] border border-[#F5DC9C]'
                      : 'bg-[#D1FAE5] text-[#065F46] border border-[#A7F3D0]'
                  }`}>
                    {notif.type === 'sighting' ? '🐾' : notif.type === 'alert' ? '🚨' : '🎉'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-[#3D3D3D] text-xs sm:text-sm">{notif.title}</h4>
                      <span className="text-[10px] text-[#8A8A8A]">{notif.time}</span>
                    </div>
                    <p className="text-xs text-[#5C5C5C] mt-1 leading-relaxed">{notif.message}</p>

                    {linkedPet && (
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#F2EDE4]">
                        <img src={linkedPet.photoUrl} alt={linkedPet.name} className="w-5 h-5 rounded-full object-cover" />
                        <span className="text-[11px] font-bold text-[#7A9D8C]">Ver anúncio de {linkedPet.name}</span>
                        <ArrowRight className="w-3 h-3 text-[#7A9D8C] ml-auto" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Informative tips box */}
        <div className="bg-[#3D3D3D] text-white rounded-[28px] p-4 space-y-2 mt-4 shadow-sm border border-[#5C5C5C]/20">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#E6B89C]" />
            <h4 className="font-bold text-xs text-[#FDFBF7]">Dica de segurança</h4>
          </div>
          <p className="text-[11px] text-[#D9D4CC] leading-relaxed">
            Nunca faça pagamentos adiantados por resgates. Sempre confirme a identidade do tutor ou protetor antes de combinar entregas em locais públicos.
          </p>
        </div>
      </div>
    </div>
  );
};
