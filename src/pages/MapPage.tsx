import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonChip,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonFab,
  IonFabButton,
  IonModal,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge
} from '@ionic/react';
import {
  locationOutline,
  callOutline,
  timeOutline,
  schoolOutline,
  storefrontOutline,
  businessOutline,
  musicalNotesOutline,
  navigateOutline,
  filterOutline
} from 'ionicons/icons';
import { CollectionPoint } from '@/types';

const MapPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  // Mock collection points data
  const [collectionPoints] = useState<CollectionPoint[]>([
    {
      id: '1',
      name: 'Super U Confluence',
      address: '112 Cours Charlemagne, 69002 Lyon',
      latitude: 45.7396,
      longitude: 4.8150,
      type: 'store',
      isActive: true,
      hours: '8h-20h (Lun-Sam)'
    },
    {
      id: '2',
      name: 'École Primaire Jean Moulin',
      address: '25 Rue Jean Moulin, 69003 Lyon',
      latitude: 45.7578,
      longitude: 4.8351,
      type: 'school',
      isActive: true,
      hours: '8h-17h (Lun-Ven)'
    },
    {
      id: '3',
      name: 'Mairie du 2ème',
      address: '2 Rue d\'Enghien, 69002 Lyon',
      latitude: 45.7480,
      longitude: 4.8320,
      type: 'public',
      isActive: true,
      hours: '9h-17h (Lun-Ven)'
    },
    {
      id: '4',
      name: 'Festival des Lumières - Stand Corepile',
      address: 'Place Bellecour, 69002 Lyon',
      latitude: 45.7558,
      longitude: 4.8320,
      type: 'event',
      isActive: true,
      hours: '18h-23h (8-12 Déc)'
    },
    {
      id: '5',
      name: 'Carrefour Part-Dieu',
      address: 'Centre Commercial Part-Dieu, 69003 Lyon',
      latitude: 45.7604,
      longitude: 4.8567,
      type: 'store',
      isActive: true,
      hours: '9h-21h (Lun-Sam)'
    }
  ]);

  useEffect(() => {
    // Get user location (mock)
    navigator.geolocation?.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      () => {
        // Default to Lyon center if location access denied
        setUserLocation({ lat: 45.7640, lng: 4.8357 });
      }
    );
  }, []);

  const filteredPoints = collectionPoints.filter(point => {
    const matchesSearch = point.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         point.address.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || point.type === selectedCategory;
    
    return matchesSearch && matchesCategory && point.isActive;
  });

  const getPointIcon = (type: string) => {
    switch (type) {
      case 'store': return storefrontOutline;
      case 'school': return schoolOutline;
      case 'public': return businessOutline;
      case 'event': return musicalNotesOutline;
      default: return locationOutline;
    }
  };

  const getPointColor = (type: string) => {
    switch (type) {
      case 'store': return 'primary';
      case 'school': return 'secondary';
      case 'public': return 'success';
      case 'event': return 'warning';
      default: return 'medium';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'store': return 'Magasin';
      case 'school': return 'École';
      case 'public': return 'Service public';
      case 'event': return 'Événement';
      default: return type;
    }
  };

  const calculateDistance = (point: CollectionPoint) => {
    if (!userLocation) return null;
    
    // Simple distance calculation (not accurate for production)
    const R = 6371; // Earth's radius in km
    const dLat = (point.latitude - userLocation.lat) * Math.PI / 180;
    const dLon = (point.longitude - userLocation.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(point.latitude * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`;
  };

  const openNavigation = (point: CollectionPoint) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${point.latitude},${point.longitude}`;
    window.open(url, '_blank');
  };

  const categoryStats = {
    all: collectionPoints.length,
    store: collectionPoints.filter(p => p.type === 'store').length,
    school: collectionPoints.filter(p => p.type === 'school').length,
    public: collectionPoints.filter(p => p.type === 'public').length,
    event: collectionPoints.filter(p => p.type === 'event').length
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Points de Collecte</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowFilterModal(true)}>
              <IonIcon icon={filterOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        
        {/* Search Bar */}
        <IonSearchbar
          value={searchText}
          onIonInput={e => setSearchText(e.detail.value!)}
          placeholder="Rechercher un point de collecte..."
          showClearButton="focus"
        />

        {/* Quick Stats */}
        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol className="ion-text-center">
                  <h3 style={{margin: '0 0 4px 0', color: 'var(--pile-go-green)'}}>{filteredPoints.length}</h3>
                  <p style={{margin: 0, fontSize: '14px'}}>Points disponibles</p>
                </IonCol>
                <IonCol className="ion-text-center">
                  <h3 style={{margin: '0 0 4px 0', color: 'var(--pile-go-orange)'}}>{categoryStats.event}</h3>
                  <p style={{margin: 0, fontSize: '14px'}}>Événements actifs</p>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Category Filter */}
        <IonSegment 
          value={selectedCategory} 
          onIonChange={e => setSelectedCategory(e.detail.value as string)}
          scrollable
        >
          <IonSegmentButton value="all">
            <IonLabel>Tous ({categoryStats.all})</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="store">
            <IonLabel>Magasins ({categoryStats.store})</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="school">
            <IonLabel>Écoles ({categoryStats.school})</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="event">
            <IonLabel>Événements ({categoryStats.event})</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* Collection Points List */}
        <IonCard>
          {filteredPoints.length > 0 ? (
            <IonList>
              {filteredPoints.map((point) => {
                const distance = calculateDistance(point);
                return (
                  <IonItem key={point.id}>
                    <IonIcon 
                      icon={getPointIcon(point.type)} 
                      color={getPointColor(point.type)}
                      slot="start"
                    />
                    <IonLabel>
                      <h3>
                        {point.name}
                        <IonChip 
                          color={getPointColor(point.type)} 
                          style={{marginLeft: '8px', fontSize: '12px'}}
                        >
                          {getTypeLabel(point.type)}
                        </IonChip>
                        {point.type === 'event' && (
                          <IonBadge color="warning" style={{marginLeft: '4px'}}>
                            Temporaire
                          </IonBadge>
                        )}
                      </h3>
                      <p>
                        <IonIcon icon={locationOutline} style={{marginRight: '4px'}} />
                        {point.address}
                        {distance && (
                          <span style={{marginLeft: '8px', color: 'var(--pile-go-green)'}}>
                            • {distance}
                          </span>
                        )}
                      </p>
                      {point.hours && (
                        <p>
                          <IonIcon icon={timeOutline} style={{marginRight: '4px'}} />
                          {point.hours}
                        </p>
                      )}
                    </IonLabel>
                    <IonButton 
                      fill="clear" 
                      color="primary"
                      onClick={() => openNavigation(point)}
                    >
                      <IonIcon icon={navigateOutline} />
                    </IonButton>
                  </IonItem>
                );
              })}
            </IonList>
          ) : (
            <IonCardContent className="ion-text-center">
              <IonIcon 
                icon={locationOutline} 
                style={{fontSize: '48px', color: 'var(--pile-go-gray)'}}
              />
              <p style={{color: 'var(--pile-go-gray)'}}>
                Aucun point de collecte trouvé.<br/>
                Essayez de modifier vos critères de recherche.
              </p>
            </IonCardContent>
          )}
        </IonCard>

        {/* Events Highlight */}
        {categoryStats.event > 0 && selectedCategory !== 'event' && (
          <IonCard color="warning">
            <IonCardHeader>
              <IonCardTitle>
                <IonIcon icon={musicalNotesOutline} style={{marginRight: '8px'}} />
                Événements Corepile
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>
                {categoryStats.event} événement(s) en cours ! 
                Participez aux concerts et festivals pour gagner des récompenses exclusives.
              </p>
              <IonButton 
                fill="clear" 
                color="dark"
                onClick={() => setSelectedCategory('event')}
              >
                Voir les événements
              </IonButton>
            </IonCardContent>
          </IonCard>
        )}

        {/* Filter Modal */}
        <IonModal isOpen={showFilterModal} onDidDismiss={() => setShowFilterModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Filtres</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowFilterModal(false)}>Fermer</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Types de points</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  <IonItem button onClick={() => {setSelectedCategory('store'); setShowFilterModal(false);}}>
                    <IonIcon icon={storefrontOutline} color="primary" slot="start" />
                    <IonLabel>
                      <h3>Magasins</h3>
                      <p>Supermarchés, pharmacies, centres commerciaux</p>
                    </IonLabel>
                    <IonBadge>{categoryStats.store}</IonBadge>
                  </IonItem>
                  <IonItem button onClick={() => {setSelectedCategory('school'); setShowFilterModal(false);}}>
                    <IonIcon icon={schoolOutline} color="secondary" slot="start" />
                    <IonLabel>
                      <h3>Écoles & Crèches</h3>
                      <p>Programme "Ma Classe Recycle"</p>
                    </IonLabel>
                    <IonBadge>{categoryStats.school}</IonBadge>
                  </IonItem>
                  <IonItem button onClick={() => {setSelectedCategory('public'); setShowFilterModal(false);}}>
                    <IonIcon icon={businessOutline} color="success" slot="start" />
                    <IonLabel>
                      <h3>Services Publics</h3>
                      <p>Mairies, centres sociaux</p>
                    </IonLabel>
                    <IonBadge>{categoryStats.public}</IonBadge>
                  </IonItem>
                  <IonItem button onClick={() => {setSelectedCategory('event'); setShowFilterModal(false);}}>
                    <IonIcon icon={musicalNotesOutline} color="warning" slot="start" />
                    <IonLabel>
                      <h3>Événements</h3>
                      <p>Concerts, festivals, matchs</p>
                    </IonLabel>
                    <IonBadge>{categoryStats.event}</IonBadge>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
          </IonContent>
        </IonModal>

      </IonContent>
    </IonPage>
  );
};

export default MapPage;