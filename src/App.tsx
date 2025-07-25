import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { 
  homeOutline, 
  batteryChargingOutline, 
  qrCodeOutline, 
  mapOutline, 
  personOutline 
} from 'ionicons/icons';

// Pages
import HomePage from '@/pages/HomePage';
import BatteryInventoryPage from '@/pages/BatteryInventoryPage';
import ScannerPage from '@/pages/ScannerPage';
import MapPage from '@/pages/MapPage';
import ProfilePage from '@/pages/ProfilePage';

// Core CSS required for Ionic components to work properly
import '@ionic/react/css/core.css';

// Basic CSS for apps built with Ionic
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

// Optional CSS utils that can be commented out
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

// Theme variables
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route exact path="/inventory">
            <BatteryInventoryPage />
          </Route>
          <Route exact path="/scanner">
            <ScannerPage />
          </Route>
          <Route exact path="/map">
            <MapPage />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" color="primary">
          <IonTabButton tab="home" href="/home">
            <IonIcon aria-hidden="true" icon={homeOutline} />
            <IonLabel>Accueil</IonLabel>
          </IonTabButton>
          <IonTabButton tab="inventory" href="/inventory">
            <IonIcon aria-hidden="true" icon={batteryChargingOutline} />
            <IonLabel>Mes Piles</IonLabel>
          </IonTabButton>
          <IonTabButton tab="scanner" href="/scanner">
            <IonIcon aria-hidden="true" icon={qrCodeOutline} />
            <IonLabel>Scanner</IonLabel>
          </IonTabButton>
          <IonTabButton tab="map" href="/map">
            <IonIcon aria-hidden="true" icon={mapOutline} />
            <IonLabel>Carte</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <IonIcon aria-hidden="true" icon={personOutline} />
            <IonLabel>Profil</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;