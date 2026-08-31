import React, { useState } from 'react';
import { Pet, PetType, PetStatus, PetSize } from '../types';
import { 
  X, 
  Camera, 
  MapPin, 
  Check, 
  Sparkles, 
  AlertCircle,
  UploadCloud,
  PawPrint,
  Heart
} from 'lucide-react';

interface RegisterPetModalProps {
  onClose: () => void;
  onAddPet: (pet: Pet) => void;
}

const SAMPLE_AVATARS = [
  'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=600&q=80',
];

export const RegisterPetModal: React.FC<RegisterPetModalProps> = ({
  onClose,
  onAddPet,
}) => {
  const [status, setStatus] = useState<PetStatus>('Perdido');
  const [name, setName] = useState('');
  const [type, setType] = useState<PetType>('Cachorro');
  const [breed, setBreed] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState<PetSize>('Médio');
  const [age, setAge] = useState('');
  const [specialCharacteristics, setSpecialCharacteristics] = useState('');
  const [photoUrl, setPhotoUrl] = useState(SAMPLE_AVATARS[0]);
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  
  // Location
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('São Paulo');
  const [state, setState] = useState('SP');
  const [lostDate, setLostDate] = useState(new Date().toLocaleDateString('pt-BR'));
  const [lostTime, setLostTime] = useState('14:00');
  const [reward, setReward] = useState('');

  // Tutor
  const [tutorName, setTutorName] = useState('Paulo Fidelis');
  const [tutorPhone, setTutorPhone] = useState('(11) 98765-4321');
  const [tutorWhatsapp, setTutorWhatsapp] = useState('11987654321');
  const [tutorEmail, setTutorEmail] = useState('fidelispaulohenrique71@gmail.com');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !breed.trim() || !color.trim() || !neighborhood.trim()) {
      alert('Por favor, preencha os campos obrigatórios.');
      return;
    }

    const newPet: Pet = {
      id: `pet-${Date.now()}`,
      name,
      type,
      breed,
      color,
      size,
      age: age || 'Idade aproximada',
      specialCharacteristics: specialCharacteristics || 'Sem características informadas',
      photoUrl: customPhoto || photoUrl,
      status,
      location: {
        address: address || `${neighborhood}, ${city}`,
        neighborhood,
        city,
        state,
        latitude: -23.5505 + (Math.random() - 0.5) * 0.1,
        longitude: -46.6333 + (Math.random() - 0.5) * 0.1,
      },
      lostDate: lostDate || new Date().toLocaleDateString('pt-BR'),
      lostTime,
      reward: reward ? `R$ ${reward}` : undefined,
      tutor: {
        name: tutorName,
        phone: tutorPhone,
        whatsapp: tutorWhatsapp.replace(/[^0-9]/g, ''),
        email: tutorEmail,
        city: `${city} - ${state}`,
        verified: true,
      },
      isFavorite: false,
      viewsCount: 1,
      sightingsCount: 0,
    };

    onAddPet(newPet);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#FDFBF7] rounded-[32px] p-5 max-w-lg w-full shadow-2xl border border-[#EAE7E2] max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#EAE7E2]">
          <div className="flex items-center gap-2">
            <span className="text-xl text-[#7A9D8C]">🐾</span>
            <div>
              <h3 className="font-bold text-[#3D3D3D] text-base sm:text-lg">Cadastrar Anúncio</h3>
              <p className="text-xs text-[#8A8A8A]">Publique um pet perdido ou encontrado na comunidade</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8A8A8A] hover:text-[#3D3D3D] hover:bg-[#F2EDE4] rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          {/* Status Selection */}
          <div>
            <label className="text-xs font-bold text-[#5C5C5C] mb-1.5 block">Tipo de Anúncio *</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setStatus('Perdido')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-2 cursor-pointer ${
                  status === 'Perdido'
                    ? 'bg-[#FFEECC] border-[#F5DC9C] text-[#B8860B] shadow-xs'
                    : 'bg-white border-[#EAE7E2] text-[#5C5C5C] hover:bg-[#F2EDE4]'
                }`}
              >
                <span>🚨</span>
                <span>Perdi meu Pet</span>
              </button>
              <button
                type="button"
                onClick={() => setStatus('Encontrado')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-2 cursor-pointer ${
                  status === 'Encontrado'
                    ? 'bg-[#D1FAE5] border-[#A7F3D0] text-[#065F46] shadow-xs'
                    : 'bg-white border-[#EAE7E2] text-[#5C5C5C] hover:bg-[#F2EDE4]'
                }`}
              >
                <span>🐾</span>
                <span>Encontrei um Pet</span>
              </button>
            </div>
          </div>

          {/* Nome e Espécie */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#5C5C5C] mb-1 block">Nome do Pet *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Buddy, Thor, Mel..."
                className="w-full p-2.5 bg-white border border-[#EAE7E2] rounded-xl text-xs text-[#3D3D3D] focus:ring-2 focus:ring-[#7A9D8C]/30 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#5C5C5C] mb-1 block">Espécie *</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as PetType)}
                className="w-full p-2.5 bg-white border border-[#EAE7E2] rounded-xl text-xs text-[#3D3D3D] focus:ring-2 focus:ring-[#7A9D8C]/30 focus:outline-none"
              >
                <option value="Cachorro">🐶 Cachorro</option>
                <option value="Gato">🐱 Gato</option>
                <option value="Pássaro">🦜 Pássaro</option>
                <option value="Outro">🐾 Outro animal</option>
              </select>
            </div>
          </div>

          {/* Raça e Cor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#5C5C5C] mb-1 block">Raça *</label>
              <input
                type="text"
                required
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder="Ex: Golden Retriever, SRD..."
                className="w-full p-2.5 bg-white border border-[#EAE7E2] rounded-xl text-xs text-[#3D3D3D] focus:ring-2 focus:ring-[#7A9D8C]/30 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#5C5C5C] mb-1 block">Cor Principal *</label>
              <input
                type="text"
                required
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Ex: Dourado, Preto e Branco..."
                className="w-full p-2.5 bg-white border border-[#EAE7E2] rounded-xl text-xs text-[#3D3D3D] focus:ring-2 focus:ring-[#7A9D8C]/30 focus:outline-none"
              />
            </div>
          </div>

          {/* Porte e Idade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#5C5C5C] mb-1 block">Porte</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as PetSize)}
                className="w-full p-2.5 bg-white border border-[#EAE7E2] rounded-xl text-xs text-[#3D3D3D] focus:outline-none"
              >
                <option value="Pequeno">Pequeno (até 10kg)</option>
                <option value="Médio">Médio (10kg a 25kg)</option>
                <option value="Grande">Grande (acima de 25kg)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-[#5C5C5C] mb-1 block">Idade aproximada</label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Ex: 3 anos, filhote..."
                className="w-full p-2.5 bg-white border border-[#EAE7E2] rounded-xl text-xs text-[#3D3D3D] focus:outline-none"
              />
            </div>
          </div>

          {/* Características Especiais */}
          <div>
            <label className="text-xs font-bold text-[#5C5C5C] mb-1 block">Características Especiais</label>
            <textarea
              rows={2}
              value={specialCharacteristics}
              onChange={(e) => setSpecialCharacteristics(e.target.value)}
              placeholder="Ex: Mancha branca no peito, coleira azul, dócil, cicatriz..."
              className="w-full p-2.5 bg-white border border-[#EAE7E2] rounded-xl text-xs text-[#3D3D3D] focus:outline-none"
            />
          </div>

          {/* Foto do Pet */}
          <div>
            <label className="text-xs font-bold text-[#5C5C5C] mb-1 flex items-center justify-between">
              <span>Foto do Pet *</span>
              <span className="text-[10px] text-[#8A8A8A]">Escolha uma foto ou faça upload</span>
            </label>
            
            {/* Sample avatar picker */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {SAMPLE_AVATARS.map((url, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => {
                    setPhotoUrl(url);
                    setCustomPhoto(null);
                  }}
                  className={`relative w-12 h-12 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                    photoUrl === url && !customPhoto
                      ? 'border-[#7A9D8C] scale-105 shadow-sm'
                      : 'border-[#EAE7E2] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt="Sample" className="w-full h-full object-cover" />
                  {photoUrl === url && !customPhoto && (
                    <div className="absolute inset-0 bg-[#7A9D8C]/40 flex items-center justify-center text-white">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </button>
              ))}

              {/* Upload button */}
              <label className="w-12 h-12 rounded-2xl border-2 border-dashed border-[#D9D4CC] hover:border-[#7A9D8C] bg-white flex items-center justify-center cursor-pointer flex-shrink-0 text-[#8A8A8A] hover:text-[#7A9D8C] transition-colors">
                <Camera className="w-4 h-4" />
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            {customPhoto && (
              <div className="mt-1 flex items-center gap-2 text-xs text-[#5F8271] bg-[#EBF2EE] p-2 rounded-xl border border-[#D1DFD8]">
                <Check className="w-3.5 h-3.5" />
                <span>Foto personalizada carregada com sucesso!</span>
              </div>
            )}
          </div>

          {/* Localização do sumiço */}
          <div className="border-t border-[#EAE7E2] pt-3 space-y-3">
            <h4 className="text-xs font-bold text-[#3D3D3D] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#7A9D8C]" />
              <span>Localização e Data</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                required
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                placeholder="Bairro *"
                className="p-2.5 bg-white border border-[#EAE7E2] rounded-xl text-xs text-[#3D3D3D]"
              />
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Cidade *"
                className="p-2.5 bg-white border border-[#EAE7E2] rounded-xl text-xs text-[#3D3D3D]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Endereço / Referência"
                className="sm:col-span-2 p-2.5 bg-white border border-[#EAE7E2] rounded-xl text-xs text-[#3D3D3D]"
              />
              <input
                type="text"
                value={lostDate}
                onChange={(e) => setLostDate(e.target.value)}
                placeholder="Data (ex: 20/05/2024)"
                className="p-2.5 bg-white border border-[#EAE7E2] rounded-xl text-xs text-[#3D3D3D]"
              />
            </div>

            {status === 'Perdido' && (
              <div>
                <input
                  type="text"
                  value={reward}
                  onChange={(e) => setReward(e.target.value)}
                  placeholder="Recompensa opcional (Ex: 500,00)"
                  className="w-full p-2.5 bg-white border border-[#EAE7E2] rounded-xl text-xs text-[#3D3D3D]"
                />
              </div>
            )}
          </div>

          {/* Dados do Tutor */}
          <div className="border-t border-[#EAE7E2] pt-3 space-y-2">
            <h4 className="text-xs font-bold text-[#3D3D3D]">Seus dados para contato</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                required
                value={tutorName}
                onChange={(e) => setTutorName(e.target.value)}
                placeholder="Nome completo *"
                className="p-2.5 bg-white border border-[#EAE7E2] rounded-xl text-xs text-[#3D3D3D]"
              />
              <input
                type="tel"
                required
                value={tutorPhone}
                onChange={(e) => setTutorPhone(e.target.value)}
                placeholder="Telefone / Celular *"
                className="p-2.5 bg-white border border-[#EAE7E2] rounded-xl text-xs text-[#3D3D3D]"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-[#EAE7E2] text-[#5C5C5C] rounded-xl text-xs font-bold hover:bg-[#F2EDE4] cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-[#7A9D8C] hover:bg-[#688E7D] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-[#7A9D8C]/20 transition-all cursor-pointer"
            >
              <PawPrint className="w-4 h-4" />
              <span>Publicar Anúncio</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
