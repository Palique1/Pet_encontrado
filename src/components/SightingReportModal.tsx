import React, { useState } from 'react';
import { Pet } from '../types';
import { 
  X, 
  MapPin, 
  Clock, 
  Camera, 
  Send, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  User, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

interface SightingReportModalProps {
  pet: Pet;
  onClose: () => void;
  onSubmitReport: (sightingData: {
    location: string;
    dateTime: string;
    condition: string;
    notes: string;
    reporterName: string;
    reporterPhone: string;
    photoUrl?: string;
  }) => void;
}

export const SightingReportModal: React.FC<SightingReportModalProps> = ({
  pet,
  onClose,
  onSubmitReport,
}) => {
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [location, setLocation] = useState('');
  const [condition, setCondition] = useState('Bem, caminhando sozinho');
  const [notes, setNotes] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim() || !reporterName.trim() || !reporterPhone.trim()) {
      alert('Por favor, preencha o seu nome, telefone e o local do avistamento.');
      return;
    }

    onSubmitReport({
      location,
      dateTime: new Date().toLocaleString('pt-BR'),
      condition,
      notes,
      reporterName,
      reporterPhone,
      photoUrl: photoPreview || undefined,
    });

    setSubmitted(true);
  };

  const handleSendWhatsAppDirect = () => {
    const message = encodeURIComponent(
      `🚨 *AVISTAMENTO DE PET PERDIDO!*\n\nOlá ${pet.tutor.name}, vi o(a) *${pet.name}*!\n\n📍 *Local:* ${location || 'Próximo ao bairro'}\n🕒 *Data/Hora:* ${new Date().toLocaleString('pt-BR')}\n🐾 *Estado do animal:* ${condition}\n📝 *Detalhes:* ${notes || 'Sem observações adicionais'}\n\n👤 *Meu contato:* ${reporterName} (${reporterPhone})\n\nEnviado através do app *Pet Encontrado*.`
    );
    window.open(`https://wa.me/55${pet.tutor.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FDFBF7] rounded-[32px] p-5 max-w-md w-full shadow-2xl border border-[#EAE7E2] max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#EAE7E2]">
          <div className="flex items-center gap-2">
            <span className="text-xl text-[#7A9D8C]">🐾</span>
            <div>
              <h3 className="font-bold text-[#3D3D3D] text-base">Informar Avistamento</h3>
              <p className="text-[11px] text-[#8A8A8A]">Ajude {pet.tutor.name} a reencontrar {pet.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8A8A8A] hover:text-[#3D3D3D] hover:bg-[#F2EDE4] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 bg-[#EBF2EE] text-[#7A9D8C] rounded-full flex items-center justify-center mx-auto shadow-inner border border-[#D1DFD8]">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-[#3D3D3D]">Muito obrigado pela ajuda!</h4>
              <p className="text-xs text-[#5C5C5C] max-w-xs mx-auto">
                O tutor <strong className="text-[#3D3D3D]">{pet.tutor.name}</strong> foi notificado sobre o avistamento de <strong>{pet.name}</strong>.
              </p>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={handleSendWhatsAppDirect}
                className="w-full py-3 bg-[#3D3D3D] hover:bg-[#2B2B2B] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#E6B89C]" />
                <span>Enviar detalhes agora no WhatsApp do Tutor</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 border border-[#EAE7E2] text-[#5C5C5C] hover:bg-[#F2EDE4] rounded-xl text-xs font-semibold cursor-pointer"
              >
                Fechar janela
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 pt-3">
            {/* Pet Mini Banner */}
            <div className="flex items-center gap-3 bg-[#FDF4EE] border border-[#E6B89C]/40 p-2.5 rounded-2xl">
              <img
                src={pet.photoUrl}
                alt={pet.name}
                className="w-12 h-12 rounded-xl object-cover border border-[#E6B89C]/30"
              />
              <div className="min-w-0 flex-1 text-xs">
                <div className="font-bold text-[#3D3D3D]">{pet.name} ({pet.breed})</div>
                <div className="text-[11px] text-[#5C5C5C] truncate">Tutor: {pet.tutor.name}</div>
              </div>
            </div>

            {/* Local do avistamento */}
            <div>
              <label className="text-xs font-bold text-[#5C5C5C] mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#7A9D8C]" />
                <span>Onde você viu o animal? *</span>
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: Próximo à padaria central, na Av. Afonso Pena"
                className="w-full p-2.5 bg-white border border-[#EAE7E2] rounded-xl text-xs text-[#3D3D3D] placeholder-[#8A8A8A] focus:ring-2 focus:ring-[#7A9D8C]/30 focus:outline-none"
              />
            </div>

            {/* Estado do animal */}
            <div>
              <label className="text-xs font-bold text-[#5C5C5C] mb-1 block">Como o pet está?</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#EAE7E2] rounded-xl text-xs text-[#3D3D3D] focus:ring-2 focus:ring-[#7A9D8C]/30 focus:outline-none"
              >
                <option value="Bem, caminhando sozinho">🐾 Bem, caminhando livremente</option>
                <option value="Assustado / Escondido">😨 Assustado ou escondido</option>
                <option value="Seguro comigo / Resgatado">🏠 Seguro comigo temporariamente</option>
                <option value="Com fome / Aparenta sede">🥣 Aparenta fome / sede</option>
                <option value="Aparenta machucado">⚠️ Aparenta machucado</option>
              </select>
            </div>

            {/* Observações */}
            <div>
              <label className="text-xs font-bold text-[#5C5C5C] mb-1 block">Observações adicionais</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: Estava com coleira azul, foi em direção à praça..."
                className="w-full p-2.5 bg-white border border-[#EAE7E2] rounded-xl text-xs text-[#3D3D3D] placeholder-[#8A8A8A] focus:ring-2 focus:ring-[#7A9D8C]/30 focus:outline-none"
              />
            </div>

            {/* Foto opcional */}
            <div>
              <label className="text-xs font-bold text-[#5C5C5C] mb-1 flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-[#8A8A8A]" />
                <span>Foto do momento (opcional)</span>
              </label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer px-3 py-2 bg-white hover:bg-[#F2EDE4] text-[#5C5C5C] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-[#EAE7E2]">
                  <Camera className="w-3.5 h-3.5 text-[#7A9D8C]" />
                  <span>{photoPreview ? 'Trocar foto' : 'Tirar / Enviar foto'}</span>
                  <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                </label>
                {photoPreview && (
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#EAE7E2]">
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Dados de quem está avisando */}
            <div className="pt-2 border-t border-[#EAE7E2] space-y-2">
              <label className="text-xs font-bold text-[#5C5C5C] block">Seus dados para contato:</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  placeholder="Seu nome *"
                  className="w-full p-2.5 bg-white border border-[#EAE7E2] rounded-xl text-xs text-[#3D3D3D] focus:outline-none"
                />
                <input
                  type="tel"
                  required
                  value={reporterPhone}
                  onChange={(e) => setReporterPhone(e.target.value)}
                  placeholder="Seu WhatsApp/Tel *"
                  className="w-full p-2.5 bg-white border border-[#EAE7E2] rounded-xl text-xs text-[#3D3D3D] focus:outline-none"
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
                <Send className="w-4 h-4" />
                <span>Enviar Alerta</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
