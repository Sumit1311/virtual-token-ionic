import React from 'react';
import { IonPage, IonHeader, IonText, IonTitle, IonToolbar } from '@ionic/react';
import AdminSettings from '../components/AdminSettings';

class AdministratorConsole extends React.Component<any> {
  render() {
    return <IonPage>
      <IonHeader >
        <IonToolbar color="primary">
          <IonTitle><IonText>
            <h1>Configuration</h1>
          </IonText></IonTitle>
        </IonToolbar>
      </IonHeader>
      <AdminSettings account={this.props.account} onShowLoader={this.props.onShowLoader} onHideLoader={this.props.onHideLoader} />
    </IonPage>
  }
}

export default AdministratorConsole;