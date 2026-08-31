import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Navigation,
  Download,
  AlertTriangle,
  PawPrint,
  Copy,
  Check
} from 'lucide-react';
import { Pet } from '../types';
import { PetLogo } from './PetLogo';

interface DetailScreenProps {
  pet: Pet;
  onBack: () => void;
  onToggleFavorite: (petId: string) => void;
  onOpenSightingReport: (pet: Pet) => void;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({
  pet,
  onBack,
  onToggleFavorite,
  onOpenSightingReport,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [showPosterModal, setShowPosterModal] = useState(false);
  const [callAlert, setCallAlert] = useState<string | null>(null);

  const handleShare = () => {
    const shareText = `🚨 AJUDE A ENCONTRAR: ${pet.name} (${pet.breed}, ${pet.color}) desaparecido em ${pet.location.neighborhood}, ${pet.location.city}. Contato do tutor: ${pet.tutor.phone}`;
    if (navigator.share) {
      navigator.share({
        title: `Procura-se ${pet.name} - Pet Encontrado`,
        text: shareText,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handleCall = () => {
    setCallAlert(`Ligando para ${pet.tutor.name}: ${pet.tutor.phone}`);
    window.location.href = `tel:${pet.tutor.phone.replace(/[^0-9]/g, '')}`;
    setTimeout(() => setCallAlert(null), 4000);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Olá ${pet.tutor.name}, vi o anúncio do pet ${pet.name} no aplicativo Pet Encontrado e gostaria de falar sobre ele.`
    );
    window.open(`https://wa.me/55${pet.tutor.whatsapp}?text=${text}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Informações sobre o pet ${pet.name} - Pet Encontrado`);
    const body = encodeURIComponent(`Olá ${pet.tutor.name},\n\nEstou entrando em contato através do app Pet Encontrado.`);
    window.location.href = `mailto:${pet.tutor.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div id="detail-screen-container" className="flex flex-col h-full bg-[#FDFBF7] overflow-y-auto">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EAE7E2] px-4 py-2.5 shadow-2xs flex items-center justify-between">
        <button
          id="btn-back-home"
          onClick={onBack}
          className="p-2 rounded-full text-[#3D3D3D] hover:bg-[#F2EDE4] active:scale-90 transition-all flex items-center justify-center cursor-pointer"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5 text-[#7A9D8C]" />
        </button>

        {/* Center App Logo */}
        <div className="flex-1 flex justify-center">
          <PetLogo size="sm" showTagline={false} />
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          <button
            id="btn-share-pet"
            onClick={handleShare}
            className="p-2 rounded-full text-[#8A8A8A] hover:text-[#3D3D3D] hover:bg-[#F2EDE4] active:scale-90 transition-all cursor-pointer"
            aria-label="Compartilhar"
          >
            {copiedLink ? <Check className="w-5 h-5 text-[#7A9D8C]" /> : <Share2 className="w-5 h-5" />}
          </button>

          <button
            id="btn-fav-detail"
            onClick={() => onToggleFavorite(pet.id)}
            className="p-2 rounded-full hover:bg-[#F2EDE4] active:scale-90 transition-all cursor-pointer"
            aria-label="Favoritar"
          >
            <Heart
              className={`w-5 h-5 ${
                pet.isFavorite
                  ? 'fill-[#E6B89C] text-[#E6B89C]'
                  : 'text-[#D9D4CC] hover:text-[#E6B89C]'
              }`}
            />
          </button>
        </div>
      </header>

      {/* Main Details Body */}
      <div className="p-4 space-y-4 pb-28">
        {/* Notification pill if link copied */}
        {copiedLink && (
          <div className="bg-[#7A9D8C] text-white text-xs font-semibold px-3 py-2 rounded-xl text-center shadow-md animate-in fade-in slide-in-from-top-2">
            Link copiado para a área de transferência!
          </div>
        )}

        {callAlert && (
          <div className="bg-[#3D3D3D] text-white text-xs font-semibold px-3 py-2 rounded-xl text-center shadow-md">
            {callAlert}
          </div>
        )}

        {/* Hero Pet Image with Rounded Corners */}
        <div className="relative rounded-[28px] overflow-hidden shadow-sm bg-[#EAE7E2] aspect-[4/3] w-full border border-[#F2EDE4]">
          <img
            src={pet.photoUrl}
            alt={pet.name}
            className="w-full h-full object-cover"
          />

          {/* Status Badge */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span
              className={`px-3 py-1 rounded-xl text-xs font-bold shadow-md uppercase tracking-wider ${
                pet.status === 'Perdido'
                  ? 'bg-[#FFEECC] text-[#B8860B] border border-[#F5DC9C]'
                  : 'bg-[#D1FAE5] text-[#065F46] border border-[#A7F3D0]'
              }`}
            >
              {pet.status === 'Perdido' ? 'Perdido' : 'Encontrado'}
            </span>

            {pet.reward && (
              <span className="px-3 py-1 rounded-xl text-xs font-bold shadow-md text-[#3D3D3D] bg-[#E6B89C] flex items-center gap-1 border border-[#D6A88C]">
                <Sparkles className="w-3 h-3 text-[#3D3D3D]" />
                Recompensa: {pet.reward}
              </span>
            )}
          </div>
        </div>

        {/* Pet Name with Paw Icon matching Natural Tones layout */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl text-[#7A9D8C]">🐾</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#3D3D3D] tracking-tight" style={{ fontFamily: "'Nunito', sans-serif" }}>
              {pet.name}
            </h1>
          </div>
          <span className="text-xs font-semibold text-[#8A8A8A] bg-[#F2EDE4] px-3 py-1 rounded-xl border border-[#EAE7E2]">
            Cód: #{pet.id.replace('pet-', '').toUpperCase()}
          </span>
        </div>

        {/* Pet Characteristics List */}
        <div className="bg-white rounded-[28px] p-4 border border-[#F2EDE4] shadow-sm space-y-2.5 text-xs sm:text-sm">
          <div className="flex items-start gap-2.5 py-1 border-b border-[#F2EDE4]">
            <span className="text-[#7A9D8C] font-semibold w-5 text-center">🐶</span>
            <span className="font-bold text-[#5C5C5C] w-24">Tipo:</span>
            <span className="text-[#3D3D3D] font-medium">{pet.type}</span>
          </div>

          <div className="flex items-start gap-2.5 py-1 border-b border-[#F2EDE4]">
            <span className="text-[#7A9D8C] font-semibold w-5 text-center">🦮</span>
            <span className="font-bold text-[#5C5C5C] w-24">Raça:</span>
            <span className="text-[#3D3D3D] font-medium">{pet.breed}</span>
          </div>

          <div className="flex items-start gap-2.5 py-1 border-b border-[#F2EDE4]">
            <span className="text-[#7A9D8C] font-semibold w-5 text-center">🎨</span>
            <span className="font-bold text-[#5C5C5C] w-24">Cor:</span>
            <span className="text-[#3D3D3D] font-medium">{pet.color}</span>
          </div>

          <div className="flex items-start gap-2.5 py-1 border-b border-[#F2EDE4]">
            <span className="text-[#7A9D8C] font-semibold w-5 text-center">📏</span>
            <span className="font-bold text-[#5C5C5C] w-24">Porte:</span>
            <span className="text-[#3D3D3D] font-medium">{pet.size}</span>
          </div>

          <div className="flex items-start gap-2.5 py-1 border-b border-[#F2EDE4]">
            <span className="text-[#7A9D8C] font-semibold w-5 text-center">🎂</span>
            <span className="font-bold text-[#5C5C5C] w-24">Idade:</span>
            <span className="text-[#3D3D3D] font-medium">{pet.age}</span>
          </div>

          <div className="flex items-start gap-2.5 py-1">
            <span className="text-[#E6B89C] font-semibold w-5 text-center">⭐</span>
            <span className="font-bold text-[#5C5C5C] w-24 flex-shrink-0">Características:</span>
            <span className="text-[#3D3D3D] font-medium leading-relaxed">
              {pet.specialCharacteristics}
            </span>
          </div>
        </div>

        {/* Section: Última Localização with Mini Map */}
        <div className="bg-white rounded-[28px] p-4 border border-[#F2EDE4] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#7A9D8C]" />
              <h2 className="font-bold text-[#3D3D3D] text-sm">Última localização</h2>
            </div>
            <button 
              onClick={() => {
                const query = encodeURIComponent(`${pet.location.address}, ${pet.location.city} - ${pet.location.state}`);
                window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
              }}
              className="text-[11px] font-bold text-[#7A9D8C] hover:text-[#5F8271] flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>Abrir no Maps</span>
              <Navigation className="w-3 h-3" />
            </button>
          </div>

          {/* Interactive Graphic Mini-Map Canvas / Mockup */}
          <div className="relative rounded-2xl h-36 bg-[#F2EDE4] border border-[#EAE7E2] overflow-hidden group">
            {/* Map Background Pattern */}
            <div className="absolute inset-0 bg-[#EAE7E2] opacity-80">
              <svg className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid-natural" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D9D4CC" strokeWidth="2"/>
                    <circle cx="20" cy="20" r="1.5" fill="#A39E96" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-natural)" />
                <path d="M 0 50 Q 150 70 300 20 T 600 60" stroke="#FDFBF7" strokeWidth="12" fill="none" />
                <path d="M 120 0 L 140 200" stroke="#FDFBF7" strokeWidth="10" fill="none" />
                <rect x="180" y="30" width="70" height="50" rx="10" fill="#7A9D8C" opacity="0.4" />
                <text x="195" y="60" fontSize="10" fill="#3D3D3D" fontWeight="bold">Parque</text>
              </svg>
            </div>

            {/* Pulsing Pin Marker at Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                <div className="w-10 h-10 bg-[#7A9D8C]/25 rounded-full animate-ping absolute" />
                <div className="w-8 h-8 bg-[#7A9D8C] rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white z-10">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-1 bg-[#3D3D3D] text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm whitespace-nowrap">
                {pet.location.neighborhood}
              </div>
            </div>

            {/* Radar coverage badge */}
            <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-lg text-[10px] font-semibold text-[#5C5C5C] shadow-2xs border border-[#EAE7E2]">
              Raio de busca ativo • 5 km
            </div>
          </div>

          {/* Address & Date Details */}
          <div className="space-y-1.5 pt-1 text-xs">
            <div className="flex items-start gap-2 text-[#5C5C5C]">
              <MapPin className="w-3.5 h-3.5 text-[#8A8A8A] mt-0.5 flex-shrink-0" />
              <span className="font-medium">
                {pet.location.address}, {pet.location.neighborhood} • {pet.location.city} - {pet.location.state}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[#5C5C5C]">
              <Calendar className="w-3.5 h-3.5 text-[#8A8A8A] flex-shrink-0" />
              <span className="font-medium">
                Desapareceu em: <strong className="text-[#3D3D3D]">{pet.lostDate} {pet.lostTime ? `às ${pet.lostTime}` : ''}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Section: Informações do Tutor */}
        <div className="bg-white rounded-[28px] p-4 border border-[#F2EDE4] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#7A9D8C] text-sm">👤</span>
              <h2 className="font-bold text-[#3D3D3D] text-sm">Informações do tutor</h2>
            </div>
            {pet.tutor.verified && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#5F8271] bg-[#EBF2EE] px-2.5 py-0.5 rounded-full border border-[#D1DFD8]">
                <CheckCircle2 className="w-3 h-3 text-[#7A9D8C]" />
                Tutor Verificado
              </span>
            )}
          </div>

          {/* Tutor Info Row */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden bg-[#F2EDE4] border border-[#EAE7E2] flex-shrink-0">
              {pet.tutor.avatarUrl ? (
                <img
                  src={pet.tutor.avatarUrl}
                  alt={pet.tutor.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-[#7A9D8C] bg-[#EBF2EE]">
                  {pet.tutor.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-bold text-[#3D3D3D] text-sm">{pet.tutor.name}</h3>
              <p className="text-xs text-[#8A8A8A]">{pet.tutor.city || pet.location.city}</p>
            </div>
          </div>

          {/* Contact Action Buttons: Ligar, WhatsApp, E-mail */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              id="btn-call-tutor"
              onClick={handleCall}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-[#7A9D8C] hover:bg-[#688E7D] text-white rounded-xl text-xs font-bold shadow-2xs transition-all active:scale-95 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Ligar</span>
            </button>

            <button
              id="btn-whatsapp-tutor"
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-[#3D3D3D] hover:bg-[#2B2B2B] text-white rounded-xl text-xs font-bold shadow-2xs transition-all active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#E6B89C]" />
              <span>WhatsApp</span>
            </button>

            <button
              id="btn-email-tutor"
              onClick={handleEmail}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-[#E6B89C] hover:bg-[#D6A88C] text-[#3D3D3D] rounded-xl text-xs font-bold shadow-2xs transition-all active:scale-95 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>E-mail</span>
            </button>
          </div>
        </div>

        {/* Primary CTA Button: "🐾 Encontrei este pet" */}
        <button
          id="btn-found-this-pet"
          onClick={() => onOpenSightingReport(pet)}
          className="w-full py-3.5 px-4 bg-[#7A9D8C] hover:bg-[#688E7D] active:bg-[#5F8271] text-white rounded-[24px] text-base font-bold shadow-md shadow-[#7A9D8C]/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <PawPrint className="w-5 h-5 fill-white" />
          <span>Encontrei este pet</span>
        </button>

        {/* Secondary: Download flyer / Poster */}
        <button
          onClick={() => setShowPosterModal(true)}
          className="w-full py-2.5 px-4 bg-white hover:bg-[#F2EDE4] text-[#5C5C5C] border border-[#EAE7E2] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#8A8A8A]" />
          <span>Gerar cartaz de busca para imprimir / redes</span>
        </button>
      </div>

      {/* Shareable Poster Modal */}
      {showPosterModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] rounded-[32px] p-5 max-w-sm w-full space-y-4 shadow-2xl border border-[#EAE7E2] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-[#EAE7E2]">
              <h3 className="font-bold text-[#3D3D3D] text-base flex items-center gap-1.5">
                <span>📄</span> Cartaz de Procura
              </h3>
              <button
                onClick={() => setShowPosterModal(false)}
                className="p-1.5 text-[#8A8A8A] hover:text-[#3D3D3D] rounded-full hover:bg-[#F2EDE4]"
              >
                ✕
              </button>
            </div>

            {/* Printable Visual Poster Card */}
            <div className="border-4 border-[#7A9D8C] rounded-[24px] p-4 bg-white text-center space-y-2 shadow-inner">
              <div className="bg-[#7A9D8C] text-white font-extrabold text-xl py-1.5 px-3 rounded-xl tracking-wider">
                PROCURA-SE
              </div>
              <div className="w-full h-44 rounded-2xl overflow-hidden bg-[#F2EDE4] border border-[#EAE7E2]">
                <img src={pet.photoUrl} alt={pet.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="text-2xl font-black text-[#3D3D3D]">{pet.name}</h4>
              <p className="text-xs font-bold text-[#5C5C5C]">{pet.breed} • {pet.color}</p>
              <div className="text-[11px] text-[#5C5C5C] bg-[#FDFBF7] p-2.5 rounded-xl text-left border border-[#EAE7E2]">
                <p><strong>Visto por último:</strong> {pet.location.neighborhood}, {pet.location.city}</p>
                <p><strong>Características:</strong> {pet.specialCharacteristics}</p>
              </div>
              {pet.reward && (
                <div className="bg-[#FFEECC] border border-[#F5DC9C] text-[#B8860B] font-bold text-xs py-1 rounded-lg">
                  RECOMPENSA: {pet.reward}
                </div>
              )}
              <div className="bg-[#3D3D3D] text-white font-bold text-xs py-2.5 rounded-xl">
                CONTATO: {pet.tutor.phone}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-2.5 bg-[#7A9D8C] hover:bg-[#688E7D] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Salvar / Imprimir</span>
              </button>
              <button
                onClick={() => setShowPosterModal(false)}
                className="px-4 py-2.5 border border-[#EAE7E2] text-[#5C5C5C] rounded-xl text-xs font-bold hover:bg-[#F2EDE4] cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
