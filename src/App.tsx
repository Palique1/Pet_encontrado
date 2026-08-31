import React, { useState, useEffect } from 'react';
import { Pet, TabType, NotificationItem, SightingReport } from './types';
import { INITIAL_PETS, INITIAL_NOTIFICATIONS } from './data/mockPets';
import { MobileFrame } from './components/MobileFrame';
import { HomeScreen } from './components/HomeScreen';
import { DetailScreen } from './components/DetailScreen';
import { SearchMapScreen } from './components/SearchMapScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { RegisterPetModal } from './components/RegisterPetModal';
import { SightingReportModal } from './components/SightingReportModal';

export default function App() {
  // Load initial pets from localStorage if available, otherwise mock pets
  const [pets, setPets] = useState<Pet[]>(() => {
    try {
      const saved = localStorage.getItem('pet_encontrado_pets');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PETS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('pet_encontrado_notifs');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Navigation & View States
  const [activeTab, setActiveTab] = useState<TabType>('inicio');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  
  // Modals
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [sightingPet, setSightingPet] = useState<Pet | null>(null);

  // Prototype UI view config
  const [isDeviceFrame, setIsDeviceFrame] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('pet_encontrado_pets', JSON.stringify(pets));
    } catch (e) {
      console.error(e);
    }
  }, [pets]);

  useEffect(() => {
    try {
      localStorage.setItem('pet_encontrado_notifs', JSON.stringify(notifications));
    } catch (e) {
      console.error(e);
    }
  }, [notifications]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  // Toggle favorite
  const handleToggleFavorite = (petId: string) => {
    setPets((prev) =>
      prev.map((pet) => {
        if (pet.id === petId) {
          const updated = !pet.isFavorite;
          showToast(updated ? `❤️ ${pet.name} adicionado aos favoritos` : `Removido dos favoritos`);
          return { ...pet, isFavorite: updated };
        }
        return pet;
      })
    );

    // Also update selectedPet if currently open
    if (selectedPet && selectedPet.id === petId) {
      setSelectedPet((prev) => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
    }
  };

  // Add new pet from form
  const handleAddPet = (newPet: Pet) => {
    setPets((prev) => [newPet, ...prev]);
    
    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Novo pet cadastrado!`,
      message: `${newPet.name} (${newPet.breed}) foi cadastrado em ${newPet.location.neighborhood}.`,
      time: 'Agora mesmo',
      petId: newPet.id,
      read: false,
      type: 'alert',
    };
    setNotifications((prev) => [newNotif, ...prev]);
    
    showToast(`✅ ${newPet.name} foi anunciado com sucesso!`);
    setSelectedPet(newPet);
  };

  // Sighting report submission
  const handleSightingReport = (data: {
    location: string;
    dateTime: string;
    condition: string;
    notes: string;
    reporterName: string;
    reporterPhone: string;
    photoUrl?: string;
  }) => {
    if (!sightingPet) return;

    // Increment sightings count
    setPets((prev) =>
      prev.map((p) => {
        if (p.id === sightingPet.id) {
          return { ...p, sightingsCount: (p.sightingsCount || 0) + 1 };
        }
        return p;
      })
    );

    // Create notification
    const newNotif: NotificationItem = {
      id: `notif-sight-${Date.now()}`,
      title: `🚨 Novo avistamento de ${sightingPet.name}!`,
      message: `Avistado em ${data.location} por ${data.reporterName}. Estado: ${data.condition}`,
      time: 'Agora mesmo',
      petId: sightingPet.id,
      read: false,
      type: 'sighting',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast(`🐾 Avistamento registrado! O tutor ${sightingPet.tutor.name} foi alertado.`);
  };

  const handleMarkAllNotifsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('Notificações marcadas como lidas');
  };

  // Quick Canva demo shortcuts
  const handleQuickViewBuddy = () => {
    const buddy = pets.find((p) => p.name === 'Buddy') || pets[0];
    setSelectedPet(buddy);
    setActiveTab('inicio');
  };

  const handleQuickViewFeed = () => {
    setSelectedPet(null);
    setActiveTab('inicio');
  };

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative font-sans select-none">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 backdrop-blur-md text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-2xl border border-slate-700/80 animate-in fade-in slide-in-from-top-4 flex items-center gap-2">
          <span>🐾</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Prototype Frame */}
      <MobileFrame
        activeTab={activeTab}
        onTabChange={(tab) => {
          setSelectedPet(null);
          setActiveTab(tab);
        }}
        onOpenRegister={() => setIsRegisterOpen(true)}
        unreadNotifsCount={unreadNotifsCount}
        isDeviceFrame={isDeviceFrame}
        onToggleDeviceFrame={() => setIsDeviceFrame(!isDeviceFrame)}
        onQuickViewBuddy={handleQuickViewBuddy}
        onQuickViewFeed={handleQuickViewFeed}
      >
        {/* Render Active View / Screen */}
        {selectedPet ? (
          <DetailScreen
            pet={selectedPet}
            onBack={() => setSelectedPet(null)}
            onToggleFavorite={handleToggleFavorite}
            onOpenSightingReport={(pet) => setSightingPet(pet)}
          />
        ) : (
          <>
            {activeTab === 'inicio' && (
              <HomeScreen
                pets={pets}
                onSelectPet={(pet) => setSelectedPet(pet)}
                onToggleFavorite={handleToggleFavorite}
                onOpenRegister={() => setIsRegisterOpen(true)}
              />
            )}

            {activeTab === 'buscar' && (
              <SearchMapScreen
                pets={pets}
                onSelectPet={(pet) => setSelectedPet(pet)}
                onToggleFavorite={handleToggleFavorite}
              />
            )}

            {activeTab === 'notificacoes' && (
              <NotificationsScreen
                notifications={notifications}
                pets={pets}
                onSelectPet={(pet) => setSelectedPet(pet)}
                onMarkAllAsRead={handleMarkAllNotifsRead}
              />
            )}

            {activeTab === 'perfil' && (
              <ProfileScreen
                pets={pets}
                onSelectPet={(pet) => setSelectedPet(pet)}
                onOpenRegister={() => setIsRegisterOpen(true)}
              />
            )}
          </>
        )}
      </MobileFrame>

      {/* Register Pet Modal */}
      {isRegisterOpen && (
        <RegisterPetModal
          onClose={() => setIsRegisterOpen(false)}
          onAddPet={handleAddPet}
        />
      )}

      {/* Sighting Report Modal ("Encontrei este pet") */}
      {sightingPet && (
        <SightingReportModal
          pet={sightingPet}
          onClose={() => setSightingPet(null)}
          onSubmitReport={handleSightingReport}
        />
      )}
    </div>
  );
}
