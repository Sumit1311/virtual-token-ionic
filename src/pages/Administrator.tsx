import React from 'react';
import { IonPage, IonHeader, IonText, IonTitle, IonToolbar } from '@ionic/react';
import AdminSettings from '../components/AdminSettings';

class AdministratorConsole extends React.Component<any> {
    render() {
        return <IonPage>
            <IonHeader >
            <IonToolbar color="primary">
            <IonTitle><IonText>
              <h1>Cofiguration</h1>
            </IonText></IonTitle>
          </IonToolbar>
            </IonHeader>
            <AdminSettings account={this.props.account} />
        </IonPage>
    }
}

export default AdministratorConsole;