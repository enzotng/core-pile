import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonAlert,
  IonToast,
  IonFab,
  IonFabButton,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonLabel
} from '@ionic/react';
import {
  qrCodeOutline,
  cameraOutline,
  checkmarkCircleOutline,
  flashlightOutline
} from 'ionicons/icons';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

const ScannerPage: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [flashOn, setFlashOn] = useState(false);

  useEffect(() => {
    return () => {
      BarcodeScanner.stopScan();
    };
  }, []);

  const startScan = async () => {
    try {
      // Check camera permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      
      if (status.granted) {
        // Make background transparent
        BarcodeScanner.hideBackground();
        setIsScanning(true);
        
        const result = await BarcodeScanner.startScan();
        
        if (result?.hasContent) {
          setScanResult(result.content);
          await processScanResult(result.content);
        }
      } else {
        setToastMessage('Permission caméra requise pour scanner');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Scan error:', error);
      setToastMessage('Erreur lors du scan');
      setShowToast(true);
    } finally {
      setIsScanning(false);
      BarcodeScanner.showBackground();
    }
  };

  const stopScan = () => {
    BarcodeScanner.stopScan();
    BarcodeScanner.showBackground();
    setIsScanning(false);
  };

  const toggleFlash = async () => {
    try {
      if (flashOn) {
        await BarcodeScanner.disableTorch();
      } else {
        await BarcodeScanner.enableTorch();
      }
      setFlashOn(!flashOn);
    } catch (error) {
      console.error('Flash error:', error);
    }
  };

  const processScanResult = async (content: string) => {
    // Mock processing of different QR code types
    if (content.includes('battery-')) {
      // Battery QR Code
      setToastMessage('Pile ajoutée à votre inventaire!');
      setShowToast(true);
    } else if (content.includes('recycling-point-')) {
      // Recycling point QR Code
      setToastMessage('Point de recyclage validé! +10 points');
      setShowToast(true);
    } else if (content.includes('event-')) {
      // Event QR Code
      setToastMessage('Événement enregistré! Récompense débloquée');
      setShowToast(true);
    } else {
      // Unknown QR Code
      setShowAlert(true);
    }
  };

  const scanInstructions = [
    {
      icon: qrCodeOutline,
      title: 'Piles',
      description: 'Scannez le QR code sur l\'emballage'
    },
    {
      icon: checkmarkCircleOutline,
      title: 'Recyclage',
      description: 'Scannez aux points de collecte'
    },
    {
      icon: cameraOutline,
      title: 'Événements',
      description: 'Scannez aux concerts & festivals'
    }
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Scanner QR Code</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        
        {!isScanning ? (
          <>
            {/* Scanner Instructions */}
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Que pouvez-vous scanner ?</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {scanInstructions.map((instruction, index) => (
                  <IonGrid key={index}>
                    <IonRow className="ion-align-items-center">
                      <IonCol size="2">
                        <IonIcon 
                          icon={instruction.icon} 
                          style={{fontSize: '24px', color: 'var(--pile-go-green)'}}
                        />
                      </IonCol>
                      <IonCol>
                        <h4 style={{margin: '0 0 4px 0'}}>{instruction.title}</h4>
                        <p style={{margin: 0, color: 'var(--pile-go-gray)'}}>
                          {instruction.description}
                        </p>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                ))}
              </IonCardContent>
            </IonCard>

            {/* Recent Scans */}
            {scanResult && (
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Dernier scan</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonChip color="success">
                    <IonIcon icon={checkmarkCircleOutline} />
                    <IonLabel>Scan réussi</IonLabel>
                  </IonChip>
                  <p style={{marginTop: '12px', fontSize: '14px', color: 'var(--pile-go-gray)'}}>
                    {scanResult}
                  </p>
                </IonCardContent>
              </IonCard>
            )}

            {/* Start Scanner Button */}
            <div className="ion-text-center" style={{marginTop: '40px'}}>
              <IonButton
                size="large"
                className="scan-button"
                onClick={startScan}
              >
                <IonIcon icon={qrCodeOutline} style={{fontSize: '32px'}} />
              </IonButton>
              <p style={{marginTop: '16px', color: 'var(--pile-go-gray)'}}>
                Appuyez pour commencer le scan
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Scanning Interface */}
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000,
              background: 'transparent'
            }}>
              {/* Scan overlay */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '250px',
                height: '250px',
                border: '2px solid var(--pile-go-green)',
                borderRadius: '12px',
                background: 'rgba(45, 211, 111, 0.1)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--pile-go-green)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px'
                }}>
                  Positionnez le QR code ici
                </div>
              </div>
              
              {/* Control buttons */}
              <IonFab vertical="bottom" horizontal="center" slot="fixed">
                <IonFabButton color="danger" onClick={stopScan}>
                  <IonIcon icon={cameraOutline} />
                </IonFabButton>
              </IonFab>
              
              <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton 
                  color={flashOn ? "warning" : "medium"} 
                  onClick={toggleFlash}
                >
                  <IonIcon icon={flashlightOutline} />
                </IonFabButton>
              </IonFab>
            </div>
          </>
        )}

        {/* Alert for unknown QR codes */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="QR Code non reconnu"
          message="Ce QR code n'est pas compatible avec Pile&Go. Essayez de scanner un QR code de pile ou de point de recyclage."
          buttons={['OK']}
        />

        {/* Success/Error Toast */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          position="top"
        />

      </IonContent>
    </IonPage>
  );
};

export default ScannerPage;