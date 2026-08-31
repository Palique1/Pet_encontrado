import React, { useState } from 'react';
import { Pet } from '../types';
import { 
  MapPin, 
  Search, 
  Sliders, 
  Crosshair, 
  ChevronRight, 
  Heart, 
  Sparkles,
  Layers,
  Radio
} from 'lucide-react';
import { PetLogo } from './PetLogo';

interface SearchMapScreenProps {
  pets: Pet[];
  onSelectPet: (pet: Pet) => void;
  onToggleFavorite: (petId: string) => void;
}

export const SearchMapScreen: React.FC<SearchMapScreenProps> = ({
  pets,
  onSelectPet,
  onToggleFavorite,
}) => {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(pets[0] || null);
  const [radiusKm, setRadiusKm] = useState<number>(10);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPets = pets.filter(p => {
    const matchesType = filterType === 'all' || p.type === filterType;
    const matchesSearch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.neighborhood.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div id="search-map-container" className="flex flex-col h-full bg-[#FDFBF7] overflow-hidden relative">
      {/* Floating Top Search Header */}
      <div className="absolute top-3 left-3 right-3 z-30 space-y-2">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-sm border border-[#EAE7E2] flex items-center gap-2">
          <Search className="w-4 h-4 text-[#8A8A8A] ml-1.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por bairro ou nome no mapa..."
            className="flex-1 bg-transparent text-xs sm:text-sm text-[#3D3D3D] placeholder-[#8A8A8A] focus:outline-none"
          />
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFilterType(filterType === 'all' ? 'Cachorro' : filterType === 'Cachorro' ? 'Gato' : 'all')}
              className="px-2.5 py-1 bg-[#EBF2EE] text-[#5F8271] rounded-xl text-[11px] font-bold border border-[#D1DFD8]"
            >
              {filterType === 'all' ? '🐾 Todos' : filterType === 'Cachorro' ? '🐶 Cães' : '🐱 Gatos'}
            </button>
          </div>
        </div>

        {/* Radius Pill Selector */}
        <div className="flex items-center gap-1.5 bg-[#3D3D3D]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-[11px] font-semibold w-max shadow-sm border border-[#5C5C5C]/40">
          <Radio className="w-3.5 h-3.5 text-[#E6B89C] animate-pulse" />
          <span className="text-[#D9D4CC]">Raio de busca:</span>
          {[5, 10, 20, 50].map((km) => (
            <button
              key={km}
              onClick={() => setRadiusKm(km)}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                radiusKm === km ? 'bg-[#7A9D8C] text-white shadow-xs' : 'text-[#A39E96] hover:text-white'
              }`}
            >
              {km}km
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map Visual Stage */}
      <div className="flex-1 w-full h-full relative bg-[#EAE7E2]">
        {/* Stylized vector map pattern */}
        <svg className="w-full h-full opacity-60 absolute inset-0 pointer-events-none">
          <defs>
            <pattern id="map-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#D9D4CC" strokeWidth="1.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#map-pattern)" />
          
          {/* Main Roads */}
          <path d="M 0 120 Q 200 180 400 140 T 800 220" stroke="#FDFBF7" strokeWidth="22" fill="none" />
          <path d="M 160 0 Q 180 300 240 700" stroke="#FDFBF7" strokeWidth="18" fill="none" />
          <path d="M 0 350 L 500 380" stroke="#FDF4EE" strokeWidth="12" fill="none" />
          
          {/* Green Zones / Parks */}
          <circle cx="120" cy="220" r="70" fill="#7A9D8C" opacity="0.4" />
          <rect x="260" y="80" width="130" height="100" rx="20" fill="#7A9D8C" opacity="0.35" />
          <rect x="80" y="440" width="180" height="90" rx="20" fill="#7A9D8C" opacity="0.3" />
        </svg>

        {/* User Current Location Indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
          <div 
            className="rounded-full border-2 border-[#7A9D8C]/40 bg-[#7A9D8C]/10 animate-pulse pointer-events-none"
            style={{ width: `${radiusKm * 18}px`, height: `${radiusKm * 18}px` }}
          />
          <div className="w-4 h-4 bg-[#7A9D8C] rounded-full border-2 border-white shadow-md absolute" />
        </div>

        {/* Pet Pin Markers distributed across map */}
        {filteredPets.map((pet, idx) => {
          const angle = (idx / filteredPets.length) * 2 * Math.PI + 0.3;
          const leftPercent = 50 + Math.cos(angle) * 35;
          const topPercent = 45 + Math.sin(angle) * 30;
          const isSelected = selectedPet?.id === pet.id;

          return (
            <div
              key={pet.id}
              onClick={() => setSelectedPet(pet)}
              style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all z-20 group ${
                isSelected ? 'scale-125 z-30' : 'hover:scale-110'
              }`}
            >
              {/* Pet Pin with miniature photo avatar */}
              <div className="flex flex-col items-center">
                <div 
                  className={`p-1 rounded-full shadow-lg transition-colors border-2 ${
                    isSelected
                      ? 'bg-[#E6B89C] border-white ring-4 ring-[#E6B89C]/30'
                      : pet.status === 'Perdido'
                      ? 'bg-[#3D3D3D] border-white'
                      : 'bg-[#7A9D8C] border-white'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-[#F2EDE4]">
                    <img src={pet.photoUrl} alt={pet.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                {/* Pin Tip */}
                <div 
                  className={`w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] -mt-0.5 ${
                    isSelected ? 'border-t-[#E6B89C]' : pet.status === 'Perdido' ? 'border-t-[#3D3D3D]' : 'border-t-[#7A9D8C]'
                  }`}
                />
                <span className="mt-0.5 bg-[#3D3D3D]/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap">
                  {pet.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Card for Selected Pet */}
      {selectedPet && (
        <div className="absolute bottom-20 left-3 right-3 z-30">
          <div 
            onClick={() => onSelectPet(selectedPet)}
            className="bg-white/95 backdrop-blur-md rounded-[24px] p-3 shadow-xl border border-[#EAE7E2] flex gap-3 items-center cursor-pointer hover:border-[#7A9D8C] transition-all"
          >
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#F2EDE4] flex-shrink-0 relative">
              <img src={selectedPet.photoUrl} alt={selectedPet.name} className="w-full h-full object-cover" />
              <span className={`absolute bottom-1 left-1 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${
                selectedPet.status === 'Perdido' ? 'bg-[#FFEECC] text-[#B8860B]' : 'bg-[#D1FAE5] text-[#065F46]'
              }`}>
                {selectedPet.status === 'Perdido' ? 'Perdido' : 'Visto'}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-[#3D3D3D] text-sm truncate">{selectedPet.name}</h4>
                <span className="text-[10px] font-semibold text-[#8A8A8A]">{selectedPet.breed}</span>
              </div>
              <p className="text-[11px] text-[#5C5C5C] truncate mt-0.5">
                📍 {selectedPet.location.neighborhood}, {selectedPet.location.city}
              </p>
              <div className="flex items-center justify-between mt-1 pt-1 border-t border-[#F2EDE4]">
                <span className="text-[10px] text-[#8A8A8A]">📅 {selectedPet.lostDate}</span>
                <span className="text-xs font-semibold text-[#7A9D8C] flex items-center gap-0.5">
                  Ver detalhes <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
