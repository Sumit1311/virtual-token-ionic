import React from 'react';
import { IonPage, IonHeader, IonText, IonTitle } from '@ionic/react';
import AdminSettings from '../components/AdminSettings';

class AdministratorConsole extends React.Component<any> {
    render() {
        return <IonPage>
            <IonHeader>
                <IonTitle><IonText>
                    <h1>Admin Settings</h1>
                </IonText></IonTitle>
            </IonHeader>
            <AdminSettings account={this.props.account} />
        </IonPage>
    }
}

export default AdministratorConsole;