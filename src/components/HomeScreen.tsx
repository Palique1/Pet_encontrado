import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Heart, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  X, 
  Check, 
  Award,
  Sparkles,
  PawPrint,
  Filter
} from 'lucide-react';
import { Pet, PetType, PetStatus } from '../types';
import { PetLogo } from './PetLogo';

interface HomeScreenProps {
  pets: Pet[];
  onSelectPet: (pet: Pet) => void;
  onToggleFavorite: (petId: string) => void;
  onOpenRegister: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  pets,
  onSelectPet,
  onToggleFavorite,
  onOpenRegister,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  // Extract unique filter options from data
  const cities = useMemo(() => {
    const set = new Set(pets.map(p => p.location.city));
    return Array.from(set);
  }, [pets]);

  const colors = useMemo(() => {
    const set = new Set(pets.map(p => p.color.split(' ')[0])); // simple color root
    return Array.from(set);
  }, [pets]);

  // Filter logic
  const filteredPets = useMemo(() => {
    return pets.filter(pet => {
      // Search term
      const matchesSearch = 
        searchTerm.trim() === '' ||
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.location.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.specialCharacteristics.toLowerCase().includes(searchTerm.toLowerCase());

      // Type filter
      const matchesType = selectedType === 'all' || pet.type === selectedType;

      // City filter
      const matchesCity = selectedCity === 'all' || pet.location.city === selectedCity;

      // Color filter
      const matchesColor = selectedColor === 'all' || pet.color.toLowerCase().includes(selectedColor.toLowerCase());

      // Status filter
      const matchesStatus = statusFilter === 'all' || pet.status === statusFilter;

      return matchesSearch && matchesType && matchesCity && matchesColor && matchesStatus;
    });
  }, [pets, searchTerm, selectedType, selectedCity, selectedColor, statusFilter]);

  const activeFiltersCount = 
    (selectedType !== 'all' ? 1 : 0) + 
    (selectedCity !== 'all' ? 1 : 0) + 
    (selectedColor !== 'all' ? 1 : 0) +
    (statusFilter !== 'all' ? 1 : 0);

  const resetFilters = () => {
    setSelectedType('all');
    setSelectedCity('all');
    setSelectedColor('all');
    setStatusFilter('all');
    setSearchTerm('');
  };

  return (
    <div id="home-screen-container" className="flex flex-col h-full bg-[#FDFBF7] overflow-y-auto">
      {/* Top Header with App Logo */}
      <header className="sticky top-0 z-20 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EAE7E2] px-4 py-3 shadow-2xs">
        <div className="flex items-center justify-between">
          <PetLogo size="md" showTagline={true} />
          
          <button
            id="btn-quick-register"
            onClick={onOpenRegister}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#7A9D8C] hover:bg-[#688E7D] text-white rounded-2xl text-xs font-bold transition-all shadow-sm active:scale-95"
          >
            <PawPrint className="w-3.5 h-3.5 fill-white" />
            <span>Anunciar Pet</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="p-4 space-y-4 pb-28">
        {/* Quick Action Banners matching Natural Tones style */}
        <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
          {/* Card 1: Perdeu seu amigo? */}
          <div className="flex-shrink-0 w-64 sm:w-72 p-4 bg-[#7A9D8C] rounded-[28px] text-white flex flex-col justify-between relative overflow-hidden shadow-sm">
            <div className="relative z-10">
              <h3 className="text-lg font-bold leading-tight mb-1">Perdeu seu amigo?</h3>
              <p className="text-white/85 text-[11px] leading-snug">Nossa comunidade está pronta para ajudar você a encontrá-lo.</p>
            </div>
            <button
              onClick={onOpenRegister}
              className="relative z-10 mt-3 bg-white text-[#7A9D8C] py-2 px-4 rounded-xl font-bold text-xs w-max shadow-sm hover:bg-[#FDFBF7] active:scale-95 transition-all"
            >
              Criar Alerta
            </button>
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full pointer-events-none" />
          </div>

          {/* Card 2: Encontrou um pet? */}
          <div className="flex-shrink-0 w-64 sm:w-72 p-4 bg-[#E6B89C] rounded-[28px] text-white flex flex-col justify-between relative overflow-hidden shadow-sm">
            <div className="relative z-10">
              <h3 className="text-lg font-bold leading-tight mb-1 text-[#3D3D3D]">Encontrou um pet?</h3>
              <p className="text-[#3D3D3D]/80 text-[11px] leading-snug">Publique os detalhes e ajude um animal a voltar para casa.</p>
            </div>
            <button
              onClick={onOpenRegister}
              className="relative z-10 mt-3 bg-[#3D3D3D] text-white py-2 px-4 rounded-xl font-bold text-xs w-max shadow-sm hover:bg-[#2B2B2B] active:scale-95 transition-all"
            >
              Reportar Pet
            </button>
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-black/5 rounded-full rotate-45 pointer-events-none" />
          </div>

          {/* Card 3: Counter */}
          <div className="flex-shrink-0 w-44 p-4 bg-[#F2EDE4] rounded-[28px] border border-[#EAE7E2] flex flex-col justify-center items-center text-center shadow-2xs">
            <span className="text-2xl mb-1">🐾</span>
            <h4 className="font-bold text-sm text-[#3D3D3D]">452 Pets</h4>
            <p className="text-[10px] text-[#8A8A8A]">Reencontrados este mês</p>
          </div>
        </div>

        {/* Search Bar & Filter Button */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8A8A]" />
            <input
              id="input-search-pets"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar animal perdido..."
              className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#EAE7E2] rounded-2xl text-xs sm:text-sm text-[#3D3D3D] placeholder-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#7A9D8C]/30 focus:border-[#7A9D8C] shadow-2xs transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A8A8A] hover:text-[#3D3D3D] p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            id="btn-open-filters"
            onClick={() => setShowFilterDrawer(true)}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all shadow-2xs ${
              activeFiltersCount > 0
                ? 'bg-[#7A9D8C] text-white shadow-[#7A9D8C]/20'
                : 'bg-[#7A9D8C] hover:bg-[#688E7D] text-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filtros</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 bg-[#E6B89C] text-[#3D3D3D] rounded-full text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Quick Dropdown Selectors matching Natural Tones style */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {/* Tipo de animal */}
          <div className="relative flex-shrink-0">
            <select
              id="select-filter-species"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className={`appearance-none pl-7 pr-6 py-1.5 rounded-xl border text-xs font-medium cursor-pointer transition-all shadow-2xs ${
                selectedType !== 'all'
                  ? 'bg-[#EBF2EE] border-[#7A9D8C] text-[#5F8271] font-semibold'
                  : 'bg-white border-[#EAE7E2] text-[#5C5C5C] hover:bg-[#FDFBF7]'
              }`}
            >
              <option value="all">🐾 Tipo de animal</option>
              <option value="Cachorro">🐶 Cachorros</option>
              <option value="Gato">🐱 Gatos</option>
              <option value="Pássaro">🦜 Pássaros</option>
              <option value="Outro">🐾 Outros</option>
            </select>
            <span className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-xs">🐾</span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#8A8A8A] text-[10px]">▼</span>
          </div>

          {/* Localização */}
          <div className="relative flex-shrink-0">
            <select
              id="select-filter-location"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className={`appearance-none pl-7 pr-6 py-1.5 rounded-xl border text-xs font-medium cursor-pointer transition-all shadow-2xs ${
                selectedCity !== 'all'
                  ? 'bg-[#EBF2EE] border-[#7A9D8C] text-[#5F8271] font-semibold'
                  : 'bg-white border-[#EAE7E2] text-[#5C5C5C] hover:bg-[#FDFBF7]'
              }`}
            >
              <option value="all">📍 Localização</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <span className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-xs">📍</span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#8A8A8A] text-[10px]">▼</span>
          </div>

          {/* Cor */}
          <div className="relative flex-shrink-0">
            <select
              id="select-filter-color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className={`appearance-none pl-7 pr-6 py-1.5 rounded-xl border text-xs font-medium cursor-pointer transition-all shadow-2xs ${
                selectedColor !== 'all'
                  ? 'bg-[#EBF2EE] border-[#7A9D8C] text-[#5F8271] font-semibold'
                  : 'bg-white border-[#EAE7E2] text-[#5C5C5C] hover:bg-[#FDFBF7]'
              }`}
            >
              <option value="all">🎨 Cor</option>
              <option value="Dourado">🟡 Dourado</option>
              <option value="Preto">⚫ Preto / Frajola</option>
              <option value="Branco">⚪ Branco</option>
              <option value="Laranja">🟠 Laranja</option>
              <option value="Tricolor">🟤 Tricolor</option>
              <option value="Bege">🌾 Bege / Marrom</option>
            </select>
            <span className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-xs">🎨</span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#8A8A8A] text-[10px]">▼</span>
          </div>

          {/* Reset Filters button if any active */}
          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="flex-shrink-0 px-2.5 py-1.5 bg-[#F2EDE4] hover:bg-[#EAE7E2] text-[#5C5C5C] rounded-xl text-xs font-medium transition-colors flex items-center gap-1 border border-[#EAE7E2]"
              title="Limpar filtros"
            >
              <X className="w-3 h-3" />
              <span>Limpar</span>
            </button>
          )}
        </div>

        {/* Status Pill Tabs */}
        <div className="flex items-center gap-2 pt-0.5">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
              statusFilter === 'all'
                ? 'bg-[#3D3D3D] text-white shadow-2xs'
                : 'bg-white border border-[#EAE7E2] text-[#5C5C5C] hover:bg-[#FDFBF7]'
            }`}
          >
            Todos ({pets.length})
          </button>
          <button
            onClick={() => setStatusFilter('Perdido')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
              statusFilter === 'Perdido'
                ? 'bg-[#FFEECC] text-[#B8860B] border border-[#F5DC9C] font-bold shadow-2xs'
                : 'bg-white border border-[#EAE7E2] text-[#8A8A8A] hover:bg-[#FFEECC]/40'
            }`}
          >
            Perdidos ({pets.filter(p => p.status === 'Perdido').length})
          </button>
          <button
            onClick={() => setStatusFilter('Encontrado')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
              statusFilter === 'Encontrado'
                ? 'bg-[#D1FAE5] text-[#065F46] border border-[#A7F3D0] font-bold shadow-2xs'
                : 'bg-white border border-[#EAE7E2] text-[#8A8A8A] hover:bg-[#D1FAE5]/40'
            }`}
          >
            Encontrados ({pets.filter(p => p.status === 'Encontrado').length})
          </button>
        </div>

        {/* Section Header: Alertas Recentes */}
        <div className="flex items-center justify-between pt-1">
          <h3 className="text-lg font-bold text-[#3D3D3D]">Alertas Recentes</h3>
          <span className="text-xs text-[#8A8A8A] font-medium">{filteredPets.length} pets listados</span>
        </div>

        {/* List of Pet Cards matching Natural Tones style */}
        <div className="space-y-3 pt-0.5">
          {filteredPets.length === 0 ? (
            <div className="bg-white rounded-[28px] p-8 text-center border border-[#F2EDE4] shadow-sm space-y-3">
              <div className="w-14 h-14 bg-[#F2EDE4] rounded-2xl flex items-center justify-center mx-auto text-[#7A9D8C]">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-[#3D3D3D] text-base">Nenhum pet encontrado</h3>
              <p className="text-xs text-[#8A8A8A] max-w-xs mx-auto">
                Não encontramos nenhum animal com os filtros selecionados. Tente ajustar a busca ou limpar os filtros.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-[#7A9D8C] hover:bg-[#688E7D] text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                Ver todos os pets
              </button>
            </div>
          ) : (
            filteredPets.map((pet) => (
              <div
                key={pet.id}
                id={`pet-card-${pet.id}`}
                className="group relative bg-white rounded-[28px] p-3.5 border border-[#F2EDE4] shadow-sm hover:border-[#EAE7E2] hover:shadow-md transition-all duration-200 flex gap-3.5 items-start"
              >
                {/* Pet Photo Thumbnail with Status tag */}
                <div 
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden flex-shrink-0 bg-[#EAE7E2] cursor-pointer"
                  onClick={() => onSelectPet(pet)}
                >
                  <img
                    src={pet.photoUrl}
                    alt={pet.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Status badge pill */}
                  <span 
                    className={`absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase shadow-2xs ${
                      pet.status === 'Perdido'
                        ? 'bg-[#FFEECC] text-[#B8860B] border border-[#F5DC9C]/80'
                        : 'bg-[#D1FAE5] text-[#065F46] border border-[#A7F3D0]/80'
                    }`}
                  >
                    {pet.status === 'Perdido' ? 'Perdido' : 'Visto'}
                  </span>
                </div>

                {/* Pet Info details */}
                <div className="flex-1 min-w-0 pr-6">
                  {/* Title row: Name + species */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 
                      onClick={() => onSelectPet(pet)}
                      className="font-bold text-[#3D3D3D] text-base sm:text-lg hover:text-[#7A9D8C] cursor-pointer tracking-tight"
                    >
                      {pet.name}
                    </h4>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#8A8A8A] bg-[#F2EDE4] px-2 py-0.5 rounded-lg">
                      {pet.breed || pet.type}
                    </span>
                  </div>

                  {/* Color / breed info */}
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-[#5C5C5C]">
                    <span className="w-2 h-2 rounded-full bg-[#E6B89C] flex-shrink-0" />
                    <span className="truncate font-medium">{pet.color}</span>
                    <span className="text-[#8A8A8A] text-[11px] truncate">• {pet.size}</span>
                  </div>

                  {/* Location info */}
                  <div className="mt-1.5 flex items-center gap-1 text-[#8A8A8A] text-xs">
                    <MapPin className="w-3.5 h-3.5 text-[#7A9D8C] flex-shrink-0" />
                    <span className="truncate">{pet.location.neighborhood}, {pet.location.city}</span>
                  </div>

                  {/* Lost date & Action button row */}
                  <div className="flex items-center justify-between gap-2 mt-2 pt-1.5 border-t border-[#F2EDE4]">
                    <div className="flex items-center gap-1 text-[11px] text-[#8A8A8A]">
                      <Calendar className="w-3 h-3 text-[#8A8A8A]" />
                      <span>{pet.lostDate}</span>
                    </div>

                    <button
                      id={`btn-details-${pet.id}`}
                      onClick={() => onSelectPet(pet)}
                      className="inline-flex items-center gap-1 text-[#7A9D8C] font-semibold text-xs hover:text-[#5F8271] transition-all cursor-pointer"
                    >
                      <span>Ver detalhes</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Favorite Heart Button (Top right of card) */}
                <button
                  id={`btn-fav-${pet.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(pet.id);
                  }}
                  aria-label="Favoritar pet"
                  className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-[#F2EDE4] text-[#D9D4CC] hover:text-[#E6B89C] transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 transition-transform active:scale-125 ${
                      pet.isFavorite
                        ? 'fill-[#E6B89C] text-[#E6B89C]'
                        : 'text-[#D9D4CC] hover:text-[#E6B89C]'
                    }`}
                  />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Filter Bottom Drawer / Modal */}
      {showFilterDrawer && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div 
            id="filter-drawer-panel"
            className="w-full max-w-md bg-[#FDFBF7] rounded-t-[32px] sm:rounded-[28px] p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto border border-[#EAE7E2] animate-in slide-in-from-bottom duration-200"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#EAE7E2]">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#7A9D8C]" />
                <h3 className="font-bold text-[#3D3D3D] text-base">Filtros de Busca</h3>
              </div>
              <button
                onClick={() => setShowFilterDrawer(false)}
                className="p-1.5 rounded-full text-[#8A8A8A] hover:text-[#3D3D3D] hover:bg-[#F2EDE4]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status */}
            <div>
              <label className="text-xs font-bold text-[#5C5C5C] mb-2 block">Status do Anúncio</label>
              <div className="grid grid-cols-3 gap-2">
                {['all', 'Perdido', 'Encontrado'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                      statusFilter === st
                        ? 'bg-[#7A9D8C] border-[#7A9D8C] text-white shadow-xs'
                        : 'bg-white border-[#EAE7E2] text-[#5C5C5C] hover:bg-[#F2EDE4]'
                    }`}
                  >
                    {st === 'all' ? 'Todos' : st === 'Perdido' ? 'Perdidos' : 'Encontrados'}
                  </button>
                ))}
              </div>
            </div>

            {/* Espécie */}
            <div>
              <label className="text-xs font-bold text-[#5C5C5C] mb-2 block">Espécie do Animal</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'all', label: 'Todos' },
                  { id: 'Cachorro', label: '🐶 Cachorros' },
                  { id: 'Gato', label: '🐱 Gatos' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedType(item.id)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition-all border ${
                      selectedType === item.id
                        ? 'bg-[#7A9D8C] border-[#7A9D8C] text-white shadow-xs'
                        : 'bg-white border-[#EAE7E2] text-[#5C5C5C] hover:bg-[#F2EDE4]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cidade */}
            <div>
              <label className="text-xs font-bold text-[#5C5C5C] mb-2 block">Cidade</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#EAE7E2] rounded-xl text-xs text-[#3D3D3D] focus:ring-2 focus:ring-[#7A9D8C]/20"
              >
                <option value="all">Todas as Cidades</option>
                {cities.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2 border-t border-[#EAE7E2]">
              <button
                onClick={resetFilters}
                className="flex-1 py-2.5 border border-[#EAE7E2] text-[#5C5C5C] hover:bg-[#F2EDE4] rounded-xl text-xs font-bold transition-all"
              >
                Limpar Todos
              </button>
              <button
                onClick={() => setShowFilterDrawer(false)}
                className="flex-1 py-2.5 bg-[#7A9D8C] hover:bg-[#688E7D] text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                Aplicar Filtros ({filteredPets.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
