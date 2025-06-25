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
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonChip,
  IonProgressBar,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
  IonBadge,
  IonModal,
  IonButtons,
  IonSegment,
  IonSegmentButton
} from '@ionic/react';
import {
  personOutline,
  trophyOutline,
  giftOutline,
  leafOutline,
  qrCodeOutline,
  shareOutline,
  settingsOutline,
  medalOutline,
  ribbonOutline,
  starOutline,
  batteryChargingOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';
import { UserProfile, Achievement, Reward } from '@/types';

const ProfilePage: React.FC = () => {
  const [showQRModal, setShowQRModal] = useState(false);
  const [showRewardsModal, setShowRewardsModal] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<string>('stats');

  // Mock user profile data
  const userProfile: UserProfile = {
    id: '1',
    name: 'Marie Dupont',
    email: 'marie.dupont@email.com',
    totalBatteriesRecycled: 47,
    totalPoints: 235,
    level: 3,
    achievements: [
      {
        id: '1',
        title: 'Premier Recyclage',
        description: 'Recyclez votre première pile',
        icon: 'trophy',
        unlockedAt: new Date('2024-01-15')
      },
      {
        id: '2',
        title: 'Écologiste Confirmé',
        description: 'Recyclez 25 piles',
        icon: 'leaf',
        unlockedAt: new Date('2024-06-10')
      },
      {
        id: '3',
        title: 'Ambassadeur Corepile',
        description: 'Participez à 3 événements',
        icon: 'star',
        unlockedAt: new Date('2024-11-20')
      }
    ],
    qrCode: 'USER-MARIE-DUPONT-001'
  };

  // Mock rewards data
  const availableRewards: Reward[] = [
    {
      id: '1',
      type: 'drink',
      title: 'Boisson gratuite',
      description: 'Valable dans les événements partenaires',
      pointsRequired: 50,
      isAvailable: true
    },
    {
      id: '2',
      type: 'bracelet',
      title: 'Bracelet exclusif Corepile',
      description: 'Bracelet en tissu recyclé aux couleurs de Corepile',
      pointsRequired: 100,
      isAvailable: true
    },
    {
      id: '3',
      type: 'discount',
      title: 'Réduction -10% magasins partenaires',
      description: 'Valable 30 jours sur une sélection de produits',
      pointsRequired: 150,
      isAvailable: true
    },
    {
      id: '4',
      type: 'goodies',
      title: 'Kit écologique Corepile',
      description: 'Sac, carnet et stylo écoresponsables',
      pointsRequired: 200,
      isAvailable: true
    }
  ];

  const nextLevelPoints = (userProfile.level + 1) * 100;
  const currentLevelProgress = userProfile.totalPoints / nextLevelPoints;

  const getLevelTitle = (level: number) => {
    const titles = [
      'Débutant',
      'Novice', 
      'Écologiste',
      'Expert',
      'Ambassadeur',
      'Champion',
      'Légende'
    ];
    return titles[Math.min(level, titles.length - 1)] || 'Maître';
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'drink': return giftOutline;
      case 'bracelet': return ribbonOutline;
      case 'discount': return starOutline;
      case 'goodies': return leafOutline;
      default: return giftOutline;
    }
  };

  const monthlyStats = [
    { month: 'Nov', batteries: 12, points: 60 },
    { month: 'Oct', batteries: 8, points: 40 },
    { month: 'Sep', batteries: 15, points: 75 },
    { month: 'Aoû', batteries: 6, points: 30 },
    { month: 'Jul', batteries: 6, points: 30 }
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mon Profil</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon icon={settingsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        
        {/* Profile Header */}
        <IonCard className="recycling-progress">
          <IonCardContent>
            <IonGrid>
              <IonRow className="ion-align-items-center">
                <IonCol size="3">
                  <IonAvatar style={{width: '80px', height: '80px', margin: '0 auto'}}>
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '32px'
                    }}>
                      👤
                    </div>
                  </IonAvatar>
                </IonCol>
                <IonCol>
                  <h2 style={{color: 'white', margin: '0 0 4px 0'}}>{userProfile.name}</h2>
                  <p style={{color: 'rgba(255,255,255,0.8)', margin: '0 0 8px 0'}}>
                    {getLevelTitle(userProfile.level)} - Niveau {userProfile.level}
                  </p>
                  <IonChip color="warning">
                    <IonIcon icon={trophyOutline} />
                    <IonLabel>{userProfile.totalPoints} points</IonLabel>
                  </IonChip>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Level Progress */}
        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonRow className="ion-align-items-center">
                <IonCol>
                  <h4 style={{margin: '0 0 8px 0'}}>Progression niveau {userProfile.level + 1}</h4>
                  <IonProgressBar 
                    value={currentLevelProgress}
                    color="primary"
                  />
                  <p style={{margin: '8px 0 0 0', fontSize: '14px', color: 'var(--pile-go-gray)'}}>
                    {userProfile.totalPoints}/{nextLevelPoints} points
                  </p>
                </IonCol>
                <IonCol size="auto">
                  <IonIcon 
                    icon={medalOutline} 
                    style={{fontSize: '32px', color: 'var(--pile-go-orange)'}}
                  />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Quick Actions */}
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton 
                expand="block" 
                fill="outline"
                onClick={() => setShowQRModal(true)}
              >
                <IonIcon icon={qrCodeOutline} slot="start" />
                Mon QR Code
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton 
                expand="block" 
                fill="outline"
                onClick={() => setShowRewardsModal(true)}
              >
                <IonIcon icon={giftOutline} slot="start" />
                Récompenses
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Segment Filter */}
        <IonSegment 
          value={selectedSegment} 
          onIonChange={e => setSelectedSegment(e.detail.value as string)}
        >
          <IonSegmentButton value="stats">
            <IonLabel>Statistiques</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="achievements">
            <IonLabel>Succès</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {selectedSegment === 'stats' ? (
          <>
            {/* Main Stats */}
            <IonGrid>
              <IonRow>
                <IonCol size="6">
                  <IonCard>
                    <IonCardContent className="ion-text-center">
                      <IonIcon 
                        icon={batteryChargingOutline} 
                        style={{fontSize: '32px', color: 'var(--pile-go-green)'}}
                      />
                      <h3 style={{margin: '8px 0 4px 0'}}>{userProfile.totalBatteriesRecycled}</h3>
                      <p style={{margin: 0, fontSize: '12px'}}>Piles recyclées</p>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol size="6">
                  <IonCard>
                    <IonCardContent className="ion-text-center">
                      <IonIcon 
                        icon={leafOutline} 
                        style={{fontSize: '32px', color: 'var(--pile-go-green)'}}
                      />
                      <h3 style={{margin: '8px 0 4px 0'}}>{(userProfile.totalBatteriesRecycled * 0.023).toFixed(1)}kg</h3>
                      <p style={{margin: 0, fontSize: '12px'}}>Métaux récupérés</p>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>

            {/* Monthly Activity */}
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Activité des derniers mois</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {monthlyStats.map((stat, index) => (
                  <IonItem key={index}>
                    <IonLabel>
                      <h3>{stat.month} 2024</h3>
                      <p>{stat.batteries} piles • {stat.points} points</p>
                    </IonLabel>
                    <IonBadge color="primary">{stat.points}</IonBadge>
                  </IonItem>
                ))}
              </IonCardContent>
            </IonCard>
          </>
        ) : (
          <>
            {/* Achievements */}
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  Succès débloqués ({userProfile.achievements.length})
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  {userProfile.achievements.map((achievement) => (
                    <IonItem key={achievement.id}>
                      <IonIcon 
                        icon={trophyOutline} 
                        color="warning"
                        slot="start"
                      />
                      <IonLabel>
                        <h3>{achievement.title}</h3>
                        <p>{achievement.description}</p>
                        {achievement.unlockedAt && (
                          <p style={{fontSize: '12px', color: 'var(--pile-go-gray)'}}>
                            Débloqué le {achievement.unlockedAt.toLocaleDateString()}
                          </p>
                        )}
                      </IonLabel>
                      <IonChip color="success">
                        <IonIcon icon={checkmarkCircleOutline} />
                        <IonLabel>Obtenu</IonLabel>
                      </IonChip>
                    </IonItem>
                  ))}
                </IonList>
              </IonCardContent>
            </IonCard>

            {/* Next Achievements */}
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Prochains succès</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  <IonItem>
                    <IonIcon 
                      icon={starOutline} 
                      color="medium"
                      slot="start"
                    />
                    <IonLabel>
                      <h3>Champion du Recyclage</h3>
                      <p>Recyclez 50 piles</p>
                      <IonProgressBar 
                        value={userProfile.totalBatteriesRecycled / 50}
                        color="primary"
                        style={{marginTop: '8px'}}
                      />
                      <p style={{fontSize: '12px', marginTop: '4px'}}>
                        {userProfile.totalBatteriesRecycled}/50 piles
                      </p>
                    </IonLabel>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
          </>
        )}

        {/* QR Code Modal */}
        <IonModal isOpen={showQRModal} onDidDismiss={() => setShowQRModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Mon QR Code</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowQRModal(false)}>Fermer</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding ion-text-center">
            <div style={{
              width: '200px',
              height: '200px',
              background: 'white',
              border: '2px solid var(--pile-go-green)',
              borderRadius: '12px',
              margin: '40px auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px'
            }}>
              📱
            </div>
            <h3>Votre QR code personnel</h3>
            <p style={{color: 'var(--pile-go-gray)'}}>
              Scannez ce code aux points de recyclage pour gagner vos points
            </p>
            <p style={{fontSize: '12px', color: 'var(--pile-go-gray)'}}>
              ID: {userProfile.qrCode}
            </p>
            <IonButton 
              expand="block" 
              fill="outline"
              style={{marginTop: '20px'}}
            >
              <IonIcon icon={shareOutline} slot="start" />
              Partager
            </IonButton>
          </IonContent>
        </IonModal>

        {/* Rewards Modal */}
        <IonModal isOpen={showRewardsModal} onDidDismiss={() => setShowRewardsModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Récompenses</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowRewardsModal(false)}>Fermer</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonCard>
              <IonCardContent className="ion-text-center">
                <h3 style={{color: 'var(--pile-go-green)'}}>Vos points: {userProfile.totalPoints}</h3>
                <p>Échangez vos points contre des récompenses !</p>
              </IonCardContent>
            </IonCard>

            {availableRewards.map((reward) => {
              const canAfford = userProfile.totalPoints >= reward.pointsRequired;
              return (
                <IonCard key={reward.id} color={canAfford ? undefined : 'light'}>
                  <IonCardContent>
                    <IonGrid>
                      <IonRow className="ion-align-items-center">
                        <IonCol size="2">
                          <IonIcon 
                            icon={getRewardIcon(reward.type)}
                            style={{
                              fontSize: '32px',
                              color: canAfford ? 'var(--pile-go-green)' : 'var(--pile-go-gray)'
                            }}
                          />
                        </IonCol>
                        <IonCol>
                          <h4 style={{margin: '0 0 4px 0'}}>{reward.title}</h4>
                          <p style={{margin: '0 0 8px 0', fontSize: '14px'}}>{reward.description}</p>
                          <IonChip color={canAfford ? "primary" : "medium"}>
                            <IonLabel>{reward.pointsRequired} points</IonLabel>
                          </IonChip>
                        </IonCol>
                        <IonCol size="auto">
                          <IonButton 
                            fill={canAfford ? "solid" : "outline"}
                            color={canAfford ? "primary" : "medium"}
                            disabled={!canAfford}
                          >
                            {canAfford ? "Échanger" : "Indisponible"}
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              );
            })}
          </IonContent>
        </IonModal>

      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;