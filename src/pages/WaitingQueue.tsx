import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonText, IonListHeader } from '@ionic/react';
import CustomerList from '../components/CustomerList';
import './WaitingQueue.css';
import CustomerAPIHelper from '../helper/api/customer';
import { Customers } from '../interfaces';

class WaitingQueue extends React.Component<any, Customers> {

  public customers: CustomerAPIHelper;

  constructor(props: any) {
    super(props);
    this.state = {
      customers: []
    }
    this.customers = new CustomerAPIHelper();
    this.onCallNextBatch = this.onCallNextBatch.bind(this);
  }

  async componentDidMount() {
    this.showLoader();
    await this.getCustomers();
    this.hideLoader();
  }

  async getCustomers() {
    const customers = await this.customers.getCustomersInQueue();
    this.setState({
      customers: customers
    });
  }

  showLoader() {
    this.props.onShowLoader();
  }

  hideLoader() {
    this.props.onHideLoader();
  }


  async onCallNextBatch(event: any) {
    this.showLoader();
    await this.customers.callNextBatch();
    const customers = await this.customers.getCustomersInQueue();
    this.setState({
      customers: customers
    });
    this.hideLoader();
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle><IonText>
              <h1>Waiting Queue</h1>
            </IonText></IonTitle>
          </IonToolbar>

        </IonHeader>
        <IonContent>
          <IonListHeader lines="none" color="secondary">
            <IonButton size="small" color="light" onClick={this.onCallNextBatch} fill="outline">Call Next Batch</IonButton>
          </IonListHeader>

          <CustomerList customers={this.state.customers} />
        </IonContent>
      </IonPage>
    );
  };

}



export default WaitingQueue;