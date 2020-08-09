import './CustomerList.css';
import React, { FormEvent } from 'react';
import { IonList, IonItem, IonLabel, IonContent, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonIcon } from '@ionic/react';
import CustomerAPIHelper from "../helper/api/customer";
import { Customer, Customers } from '../interfaces';
import moment from "moment";
import { checkmark, call } from 'ionicons/icons';
import UpdateQueueRequest from '../helper/api/requests/UpdateCustomerRequest';

export default class CustomerList extends React.Component<any, Customers>{
  public customers: CustomerAPIHelper;

  constructor(props: any) {
    super(props);
    this.state = {
      customers: []
    }
    this.customers = new CustomerAPIHelper();
    this.onChange = this.onChange.bind(this);
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

  async onChange(event: CustomEvent) {
    let queueId = event.detail.value, isActive = !event.detail.checked;
    let customer = this.state.customers.find((v: Customer) => (v.queueId === queueId));

    if (customer && customer.active !== isActive) {
      this.showLoader()
      await this.customers.updateQueueRecord(new UpdateQueueRequest()
        .setQueueId(queueId)
        .setActive(isActive));
      this.setState({
        customers: this.state.customers.map((v: Customer) => {
          if (v.queueId === queueId) {
            v.active = isActive;
          }
          return v;
        })
      })
      this.hideLoader();
    }

  }

  render() {
    return <IonContent>
      {/*-- List of Text Items --*/}
      <IonList lines="none">
        {
          this.state.customers.map((customer: Customer) => {
            return <IonItemSliding key={customer.mobileNo}>
              <IonItem className={customer.active ? "list-item-active" : "list-item-inactive"}>
                <IonLabel><b>Token No : {customer.token}<br></br> Slot : {moment(customer.allotedSlot.from).format("hh:mm a")} to {moment(customer.allotedSlot.to).format("hh:mm a")}</b> <h6>{customer.mobileNo}</h6></IonLabel>
                <IonCheckbox slot="start" value={customer.queueId} disabled={!customer.active} onIonChange={this.onChange} checked={!customer.active}></IonCheckbox>
              </IonItem>
              {/*<IonItemOptions side="end">
                <IonItemOption href={`tel:+1-303-499-7111`}><IonIcon slot="icon-only" icon={call} /></IonItemOption>
              </IonItemOptions>*/}
            </IonItemSliding>
          })
        }
      </IonList>

    </IonContent>
  }
}
