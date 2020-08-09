import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText } from '@ionic/react';
import CustomerList from '../components/CustomerList';
import './WaitingQueue.css';
import CustomerAPIHelper from '../helper/api/customer';
import { Customers } from '../interfaces';

class WaitingQueue extends React.Component<any> {

  public customers: CustomerAPIHelper;

  constructor(props: any) {
    super(props);
    this.state = {
      customers: []
    }
    this.customers = new CustomerAPIHelper();
    this.onCallNextBatch = this.onCallNextBatch.bind(this);
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
    this.hideLoader();
  }

  render() {
    return (
      <IonPage>
        <IonHeader  >
          <IonToolbar color="primary">
            <IonTitle><IonText>
              <h1>Queue</h1>
            </IonText></IonTitle>
          </IonToolbar>

        </IonHeader>
        <IonContent>
          <CustomerList onShowLoader={this.props.onShowLoader} onHideLoader={this.props.onHideLoader} />
        </IonContent>
      </IonPage>
    );
  };

}



export default WaitingQueue;