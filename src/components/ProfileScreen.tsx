import React, { useState } from 'react';
import { Pet } from '../types';
import { 
  User, 
  Heart, 
  PawPrint, 
  Settings, 
  HelpCircle, 
  Shield, 
  Share2, 
  ChevronRight, 
  Plus, 
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { PetLogo } from './PetLogo';

interface ProfileScreenProps {
  pets: Pet[];
  onSelectPet: (pet: Pet) => void;
  onOpenRegister: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  pets,
  onSelectPet,
  onOpenRegister,
}) => {
  const [activeTab, setActiveTab] = useState<'favorites' | 'my_pets'>('favorites');

  const favoritePets = pets.filter(p => p.isFavorite);
  const myRegisteredPets = pets.slice(0, 2); // Sample registered pets for the active user

  return (
    <div id="profile-screen-container" className="flex flex-col h-full bg-[#FDFBF7] overflow-y-auto">
      {/* Header Profile Hero with Natural Tones */}
      <div className="bg-[#7A9D8C] text-white p-5 pt-6 pb-8 rounded-b-[32px] shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md bg-[#5F8271]">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt="Perfil"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#E6B89C] border-2 border-white rounded-full" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="font-bold text-lg truncate text-white">Fernanda Oliveira</h2>
              <CheckCircle2 className="w-4 h-4 text-[#E6B89C] flex-shrink-0" />
            </div>
            <p className="text-xs text-[#EBF2EE]">Belo Horizonte - MG</p>
            <span className="inline-block mt-1 bg-white/20 backdrop-blur-xs text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white">
              Tutor Protetor 🐾
            </span>
          </div>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/20 text-center">
          <div>
            <span className="text-lg font-bold text-white">{myRegisteredPets.length}</span>
            <p className="text-[10px] text-[#EBF2EE]">Meus Anúncios</p>
          </div>
          <div>
            <span className="text-lg font-bold text-white">{favoritePets.length}</span>
            <p className="text-[10px] text-[#EBF2EE]">Favoritos</p>
          </div>
          <div>
            <span className="text-lg font-bold text-white">5</span>
            <p className="text-[10px] text-[#EBF2EE]">Reencontros</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-4 space-y-4 pb-24 -mt-3">
        <div className="flex bg-white p-1 rounded-[24px] border border-[#EAE7E2] shadow-sm">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'favorites'
                ? 'bg-[#7A9D8C] text-white shadow-xs'
                : 'text-[#5C5C5C] hover:text-[#3D3D3D]'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Salvos ({favoritePets.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('my_pets')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'my_pets'
                ? 'bg-[#7A9D8C] text-white shadow-xs'
                : 'text-[#5C5C5C] hover:text-[#3D3D3D]'
            }`}
          >
            <PawPrint className="w-3.5 h-3.5" />
            <span>Meus Pets ({myRegisteredPets.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'favorites' ? (
          <div className="space-y-2.5">
            {favoritePets.length === 0 ? (
              <div className="bg-white rounded-[28px] p-6 text-center border border-[#F2EDE4] text-[#8A8A8A] text-xs">
                Nenhum pet favoritado ainda. Clique no coração em qualquer pet para salvá-lo aqui.
              </div>
            ) : (
              favoritePets.map(pet => (
                <div
                  key={pet.id}
                  onClick={() => onSelectPet(pet)}
                  className="bg-white rounded-[24px] p-3 border border-[#F2EDE4] shadow-xs flex items-center gap-3 cursor-pointer hover:border-[#7A9D8C] transition-all"
                >
                  <img src={pet.photoUrl} alt={pet.name} className="w-14 h-14 rounded-2xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[#3D3D3D] text-sm">{pet.name}</h4>
                    <p className="text-xs text-[#8A8A8A]">{pet.breed} • {pet.location.neighborhood}</p>
                    <span className="text-[10px] font-semibold text-[#7A9D8C]">Status: {pet.status}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#8A8A8A]" />
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-2.5">
            {myRegisteredPets.map(pet => (
              <div
                key={pet.id}
                onClick={() => onSelectPet(pet)}
                className="bg-white rounded-[24px] p-3 border border-[#F2EDE4] shadow-xs flex items-center gap-3 cursor-pointer hover:border-[#7A9D8C] transition-all"
              >
                <img src={pet.photoUrl} alt={pet.name} className="w-14 h-14 rounded-2xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-[#3D3D3D] text-sm">{pet.name}</h4>
                    <span className="text-[9px] bg-[#FFEECC] text-[#B8860B] border border-[#F5DC9C] font-bold px-1.5 py-0.5 rounded-md">
                      {pet.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#8A8A8A]">Publicado em {pet.lostDate}</p>
                  <p className="text-[11px] text-[#7A9D8C] font-semibold">{pet.sightingsCount || 0} avistamentos recebidos</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8A8A8A]" />
              </div>
            ))}

            <button
              onClick={onOpenRegister}
              className="w-full py-3 bg-[#EBF2EE] hover:bg-[#DCEAE3] border border-[#D1DFD8] text-[#5F8271] rounded-[24px] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Cadastrar outro animal</span>
            </button>
          </div>
        )}

        {/* Action Menu List */}
        <div className="bg-white rounded-[24px] border border-[#F2EDE4] shadow-sm divide-y divide-[#F2EDE4] text-xs overflow-hidden mt-4">
          <button 
            onClick={() => alert('App Pet Encontrado - Versão 1.0 Protótipo. Juntos reunimos quem ama!')}
            className="w-full p-3.5 flex items-center justify-between text-[#3D3D3D] hover:bg-[#FDFBF7] cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-4 h-4 text-[#7A9D8C]" />
              <span className="font-semibold">Como funciona o app?</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8A8A8A]" />
          </button>

          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: 'Pet Encontrado', text: 'Conheça o app Pet Encontrado para ajudar animais perdidos!', url: window.location.href });
              } else {
                alert('Link do app copiado!');
              }
            }}
            className="w-full p-3.5 flex items-center justify-between text-[#3D3D3D] hover:bg-[#FDFBF7] cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Share2 className="w-4 h-4 text-[#E6B89C]" />
              <span className="font-semibold">Compartilhar o aplicativo</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8A8A8A]" />
          </button>
        </div>
      </div>
    </div>
  );
};
