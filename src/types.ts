export type PetType = 'Cachorro' | 'Gato' | 'Pássaro' | 'Outro';
export type PetStatus = 'Perdido' | 'Encontrado' | 'Reencontrado';
export type PetSize = 'Pequeno' | 'Médio' | 'Grande';

export interface TutorInfo {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  avatarUrl?: string;
  city: string;
  verified?: boolean;
}

export interface Pet {
  id: string;
  name: string;
  type: PetType;
  breed: string;
  color: string;
  size: PetSize;
  age: string;
  specialCharacteristics: string;
  photoUrl: string;
  status: PetStatus;
  location: {
    address: string;
    neighborhood: string;
    city: string;
    state: string;
    latitude: number;
    longitude: number;
  };
  lostDate: string; // e.g. "18/05/2025"
  lostTime?: string; // e.g. "14:30"
  reward?: string; // e.g. "R$ 500,00"
  tutor: TutorInfo;
  isFavorite?: boolean;
  viewsCount?: number;
  sightingsCount?: number;
}

export interface SightingReport {
  id: string;
  petId: string;
  petName: string;
  reportedBy: string;
  contactPhone: string;
  location: string;
  date: string;
  time: string;
  description: string;
  photoUrl?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  petId?: string;
  read: boolean;
  type: 'alert' | 'sighting' | 'success' | 'info';
}

export type TabType = 'inicio' | 'buscar' | 'anunciar' | 'notificacoes' | 'perfil';
