import React from 'react';
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
  IonGrid,
  IonRow,
  IonCol,
  IonProgressBar,
  IonBadge
} from '@ionic/react';
import {
  qrCodeOutline,
  batteryChargingOutline,
  mapOutline,
  leafOutline,
  trophyOutline,
  giftOutline
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const HomePage: React.FC = () => {
  const history = useHistory();
  
  // Mock data for demonstration
  const userStats = {
    batteriesRecycled: 47,
    totalPoints: 235,
    currentLevel: 3,
    nextLevelPoints: 300,
    expiredBatteries: 3
  };

  const quickActions = [
    {
      title: 'Scanner QR Code',
      icon: qrCodeOutline,
      color: 'primary',
      action: () => history.push('/scanner')
    },
    {
      title: 'Mes Piles',
      icon: batteryChargingOutline,
      color: 'warning',
      action: () => history.push('/inventory')
    },
    {
      title: 'Points de Collecte',
      icon: mapOutline,
      color: 'secondary',
      action: () => history.push('/map')
    }
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Pile&Go</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        
        {/* Welcome Section */}
        <IonCard className="recycling-progress">
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="8">
                  <h2 style={{color: 'white', margin: '0 0 8px 0'}}>
                    Bonjour! 👋
                  </h2>
                  <p style={{color: 'rgba(255,255,255,0.8)', margin: 0}}>
                    Continuez votre mission écologique
                  </p>
                </IonCol>
                <IonCol size="4" className="ion-text-center">
                  <IonIcon 
                    icon={leafOutline} 
                    style={{fontSize: '48px', color: 'white'}}
                  />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Stats Cards */}
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <IonCard>
                <IonCardContent className="ion-text-center">
                  <IonIcon 
                    icon={trophyOutline} 
                    style={{fontSize: '32px', color: 'var(--pile-go-green)'}}
                  />
                  <h3 style={{margin: '8px 0 4px 0'}}>{userStats.batteriesRecycled}</h3>
                  <p style={{margin: 0, color: 'var(--pile-go-gray)'}}>
                    Piles recyclées
                  </p>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard>
                <IonCardContent className="ion-text-center">
                  <IonIcon 
                    icon={giftOutline} 
                    style={{fontSize: '32px', color: 'var(--pile-go-orange)'}}
                  />
                  <h3 style={{margin: '8px 0 4px 0'}}>{userStats.totalPoints}</h3>
                  <p style={{margin: 0, color: 'var(--pile-go-gray)'}}>
                    Points gagnés
                  </p>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Level Progress */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              Niveau {userStats.currentLevel}
              <IonBadge color="primary" style={{marginLeft: '8px'}}>
                {userStats.totalPoints}/{userStats.nextLevelPoints}
              </IonBadge>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonProgressBar 
              value={userStats.totalPoints / userStats.nextLevelPoints}
              color="primary"
            />
            <p style={{margin: '8px 0 0 0', fontSize: '14px', color: 'var(--pile-go-gray)'}}>
              {userStats.nextLevelPoints - userStats.totalPoints} points pour le niveau suivant
            </p>
          </IonCardContent>
        </IonCard>

        {/* Alert for Expired Batteries */}
        {userStats.expiredBatteries > 0 && (
          <IonCard color="warning">
            <IonCardContent>
              <IonGrid>
                <IonRow className="ion-align-items-center">
                  <IonCol>
                    <h4 style={{margin: '0 0 4px 0'}}>⚠️ Piles expirées</h4>
                    <p style={{margin: 0}}>
                      {userStats.expiredBatteries} pile(s) à recycler
                    </p>
                  </IonCol>
                  <IonCol size="auto">
                    <IonButton 
                      fill="clear" 
                      color="dark"
                      onClick={() => history.push('/inventory')}
                    >
                      Voir
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        )}

        {/* Quick Actions */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Actions rapides</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                {quickActions.map((action, index) => (
                  <IonCol size="4" key={index} className="ion-text-center">
                    <IonButton
                      fill="outline"
                      color={action.color}
                      style={{
                        width: '100%',
                        height: '80px',
                        flexDirection: 'column'
                      }}
                      onClick={action.action}
                    >
                      <IonIcon icon={action.icon} style={{fontSize: '24px'}} />
                      <span style={{fontSize: '12px', marginTop: '4px'}}>
                        {action.title}
                      </span>
                    </IonButton>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default HomePage;