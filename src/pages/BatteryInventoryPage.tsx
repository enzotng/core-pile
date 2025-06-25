import React, { useState } from 'react';
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
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonFab,
  IonFabButton,
  IonModal,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonButtons,
  IonSegment,
  IonSegmentButton,
  IonChip,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import {
  addOutline,
  batteryChargingOutline,
  warningOutline,
  checkmarkCircleOutline,
  trashOutline,
  calendarOutline,
  homeOutline
} from 'ionicons/icons';
import { Battery } from '@/types';

const BatteryInventoryPage: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<string>('active');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBattery, setNewBattery] = useState<Partial<Battery>>({
    type: 'AA',
    brand: '',
    location: '',
    dateAdded: new Date(),
    expiryDate: undefined
  });

  // Mock data for batteries
  const [batteries, setBatteries] = useState<Battery[]>([
    {
      id: '1',
      type: 'AA',
      brand: 'Duracell',
      location: 'Télécommande TV',
      dateAdded: new Date('2024-01-15'),
      expiryDate: new Date('2025-01-15'),
      isExpired: false,
      isRecycled: false
    },
    {
      id: '2',
      type: 'AAA',
      brand: 'Energizer',
      location: 'Souris ordinateur',
      dateAdded: new Date('2024-02-01'),
      expiryDate: new Date('2024-12-01'),
      isExpired: true,
      isRecycled: false
    },
    {
      id: '3',
      type: '9V',
      brand: 'Varta',
      location: 'Détecteur fumée',
      dateAdded: new Date('2024-03-10'),
      expiryDate: new Date('2025-03-10'),
      isExpired: false,
      isRecycled: false
    },
    {
      id: '4',
      type: 'AA',
      brand: 'Duracell',
      location: 'Lampe de poche',
      dateAdded: new Date('2024-01-01'),
      isExpired: false,
      isRecycled: true
    }
  ]);

  const activeBatteries = batteries.filter(b => !b.isRecycled);
  const expiredBatteries = activeBatteries.filter(b => b.isExpired);
  const recycledBatteries = batteries.filter(b => b.isRecycled);

  const addBattery = () => {
    const battery: Battery = {
      id: Date.now().toString(),
      type: newBattery.type as Battery['type'],
      brand: newBattery.brand || '',
      location: newBattery.location || '',
      dateAdded: new Date(),
      expiryDate: newBattery.expiryDate,
      isExpired: newBattery.expiryDate ? new Date() > newBattery.expiryDate : false,
      isRecycled: false
    };

    setBatteries([...batteries, battery]);
    setNewBattery({
      type: 'AA',
      brand: '',
      location: '',
      dateAdded: new Date(),
      expiryDate: undefined
    });
    setIsModalOpen(false);
  };

  const markAsRecycled = (batteryId: string) => {
    setBatteries(batteries.map(b => 
      b.id === batteryId ? { ...b, isRecycled: true } : b
    ));
  };

  const deleteBattery = (batteryId: string) => {
    setBatteries(batteries.filter(b => b.id !== batteryId));
  };

  const getBatteryIcon = (type: string) => {
    return batteryChargingOutline;
  };

  const getBatteryColor = (battery: Battery) => {
    if (battery.isRecycled) return 'success';
    if (battery.isExpired) return 'danger';
    return 'primary';
  };

  const renderBatteryList = (batteryList: Battery[]) => (
    <IonList>
      {batteryList.map((battery) => (
        <IonItem key={battery.id}>
          <IonIcon 
            icon={getBatteryIcon(battery.type)} 
            color={getBatteryColor(battery)}
            slot="start"
          />
          <IonLabel>
            <h3>
              {battery.brand} - {battery.type}
              {battery.isExpired && <IonBadge color="danger" style={{marginLeft: '8px'}}>Expirée</IonBadge>}
              {battery.isRecycled && <IonBadge color="success" style={{marginLeft: '8px'}}>Recyclée</IonBadge>}
            </h3>
            <p>
              <IonIcon icon={homeOutline} style={{marginRight: '4px'}} />
              {battery.location}
            </p>
            {battery.expiryDate && (
              <p>
                <IonIcon icon={calendarOutline} style={{marginRight: '4px'}} />
                Expire le {battery.expiryDate.toLocaleDateString()}
              </p>
            )}
          </IonLabel>
          <IonButtons slot="end">
            {!battery.isRecycled && (
              <IonButton 
                fill="clear" 
                color="success"
                onClick={() => markAsRecycled(battery.id)}
              >
                <IonIcon icon={checkmarkCircleOutline} />
              </IonButton>
            )}
            <IonButton 
              fill="clear" 
              color="danger"
              onClick={() => deleteBattery(battery.id)}
            >
              <IonIcon icon={trashOutline} />
            </IonButton>
          </IonButtons>
        </IonItem>
      ))}
    </IonList>
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mes Piles</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        
        {/* Statistics Cards */}
        <IonGrid>
          <IonRow>
            <IonCol size="4">
              <IonCard>
                <IonCardContent className="ion-text-center">
                  <h3 style={{margin: '0 0 4px 0', color: 'var(--pile-go-green)'}}>{activeBatteries.length}</h3>
                  <p style={{margin: 0, fontSize: '12px'}}>Actives</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="4">
              <IonCard>
                <IonCardContent className="ion-text-center">
                  <h3 style={{margin: '0 0 4px 0', color: 'var(--ion-color-danger)'}}>{expiredBatteries.length}</h3>
                  <p style={{margin: 0, fontSize: '12px'}}>Expirées</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="4">
              <IonCard>
                <IonCardContent className="ion-text-center">
                  <h3 style={{margin: '0 0 4px 0', color: 'var(--ion-color-success)'}}>{recycledBatteries.length}</h3>
                  <p style={{margin: 0, fontSize: '12px'}}>Recyclées</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Expired Batteries Alert */}
        {expiredBatteries.length > 0 && (
          <IonCard color="warning">
            <IonCardContent>
              <IonGrid>
                <IonRow className="ion-align-items-center">
                  <IonCol>
                    <IonIcon icon={warningOutline} style={{marginRight: '8px'}} />
                    <strong>{expiredBatteries.length} pile(s) expirée(s)</strong>
                    <p style={{margin: '4px 0 0 0'}}>
                      Pensez à les recycler dans un point de collecte
                    </p>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        )}

        {/* Segment Filter */}
        <IonSegment 
          value={selectedSegment} 
          onIonChange={e => setSelectedSegment(e.detail.value as string)}
        >
          <IonSegmentButton value="active">
            <IonLabel>Actives ({activeBatteries.length})</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="recycled">
            <IonLabel>Recyclées ({recycledBatteries.length})</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* Battery Lists */}
        <IonCard>
          {selectedSegment === 'active' ? (
            activeBatteries.length > 0 ? (
              renderBatteryList(activeBatteries)
            ) : (
              <IonCardContent className="ion-text-center">
                <IonIcon 
                  icon={batteryChargingOutline} 
                  style={{fontSize: '48px', color: 'var(--pile-go-gray)'}}
                />
                <p style={{color: 'var(--pile-go-gray)'}}>
                  Aucune pile active.<br/>
                  Ajoutez vos piles pour les suivre.
                </p>
              </IonCardContent>
            )
          ) : (
            recycledBatteries.length > 0 ? (
              renderBatteryList(recycledBatteries)
            ) : (
              <IonCardContent className="ion-text-center">
                <IonIcon 
                  icon={checkmarkCircleOutline} 
                  style={{fontSize: '48px', color: 'var(--pile-go-gray)'}}
                />
                <p style={{color: 'var(--pile-go-gray)'}}>
                  Aucune pile recyclée encore.<br/>
                  Commencez à recycler pour gagner des points !
                </p>
              </IonCardContent>
            )
          )}
        </IonCard>

        {/* Add Battery FAB */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color="primary" onClick={() => setIsModalOpen(true)}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>

        {/* Add Battery Modal */}
        <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Ajouter une pile</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsModalOpen(false)}>Fermer</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="stacked">Type de pile</IonLabel>
              <IonSelect 
                value={newBattery.type} 
                onSelectionChange={e => setNewBattery({...newBattery, type: e.detail.value})}
              >
                <IonSelectOption value="AA">AA</IonSelectOption>
                <IonSelectOption value="AAA">AAA</IonSelectOption>
                <IonSelectOption value="9V">9V</IonSelectOption>
                <IonSelectOption value="CR2032">CR2032</IonSelectOption>
                <IonSelectOption value="Other">Autre</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Marque</IonLabel>
              <IonInput 
                value={newBattery.brand}
                onIonInput={e => setNewBattery({...newBattery, brand: e.detail.value!})}
                placeholder="Ex: Duracell, Energizer..."
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Emplacement</IonLabel>
              <IonInput 
                value={newBattery.location}
                onIonInput={e => setNewBattery({...newBattery, location: e.detail.value!})}
                placeholder="Ex: Télécommande TV, Souris..."
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Date d'expiration (optionnel)</IonLabel>
              <IonDatetime 
                value={newBattery.expiryDate?.toISOString()}
                onIonChange={e => setNewBattery({...newBattery, expiryDate: new Date(e.detail.value as string)})}
                presentation="date"
              />
            </IonItem>

            <IonButton 
              expand="block" 
              onClick={addBattery}
              style={{marginTop: '20px'}}
              disabled={!newBattery.brand || !newBattery.location}
            >
              Ajouter la pile
            </IonButton>
          </IonContent>
        </IonModal>

      </IonContent>
    </IonPage>
  );
};

export default BatteryInventoryPage;