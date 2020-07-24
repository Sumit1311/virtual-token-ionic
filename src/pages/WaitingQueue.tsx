import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonText } from '@ionic/react';
import CustomerList from '../components/CustomerList';
import './WaitingQueue.css';
import constants from '../constants';
import AccountAPIHelper from '../helper/api/Accounts';

class WaitingQueue extends React.Component {

  public accounts: AccountAPIHelper;

  constructor(props: any) {
    super(props);
    this.accounts = new AccountAPIHelper();
    this.onCallNextBatch = this.onCallNextBatch.bind(this);
  }

  async onCallNextBatch(event: any) {
    await this.accounts.callNextBatch(constants.ACCOUNT_ID);
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle><IonText>
              <h1>Waiting Queue</h1>
            </IonText></IonTitle>
            <IonButton shape="round" onClick={this.onCallNextBatch} fill="outline" slot="end">Call Next Batch</IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Waiting Queue</IonTitle>
            </IonToolbar>
          </IonHeader>
          <CustomerList accountId={constants.ACCOUNT_ID} />
        </IonContent>
      </IonPage>
    );
  };

}



export default WaitingQueue;
