import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonText } from '@ionic/react';
import CustomerList from '../components/CustomerList';
import './WaitingQueue.css';
import constants from '../constants';
import AccountAPIHelper from '../helper/api/Accounts';
import { Customers } from '../interfaces';

class WaitingQueue extends React.Component {

  public accounts: AccountAPIHelper;
  public state: Customers;
  
  constructor(props: any) {
    super(props);
    this.state = {
      customers: []
    }
    this.accounts = new AccountAPIHelper();
    this.onCallNextBatch = this.onCallNextBatch.bind(this);
  }

  async componentDidMount() {
    const customers = await this.accounts.getCustomersInQueue(constants.ACCOUNT_ID);
    this.setState({
      customers: customers
    });
  }

  async onCallNextBatch(event: any) {
    await this.accounts.callNextBatch(constants.ACCOUNT_ID);
    const customers = await this.accounts.getCustomersInQueue(constants.ACCOUNT_ID);
    this.setState({
      customers: customers
    });
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
          <CustomerList accountId={constants.ACCOUNT_ID} customers={this.state.customers} />
        </IonContent>
      </IonPage>
    );
  };

}



export default WaitingQueue;
