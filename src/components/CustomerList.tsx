import './CustomerList.css';
import React from 'react';
import { IonList, IonItem, IonLabel, IonContent } from '@ionic/react';
import CustomerAPIHelper from "../helper/api/customer";
import { CustomerListProps, Customer } from '../interfaces';
import moment from "moment";

export default class CustomerList extends React.Component<CustomerListProps>{
  public accounts: CustomerAPIHelper;
  public state: any;

  constructor(props: CustomerListProps) {
    super(props);
    this.accounts = new CustomerAPIHelper();
  }

  render() {
    return <IonContent>
      {/*-- List of Text Items --*/}
      <IonList lines="none">
        {
          this.props.customers.map((customer: Customer) => {
            return <IonItem key={customer.mobileNo}><IonLabel><b>Token No : {customer.token}<br></br> Slot : {moment(customer.allotedSlot.from).format("hh:mm a")} to {moment(customer.allotedSlot.to).format("hh:mm a")}</b> <h6>{customer.mobileNo}</h6></IonLabel>
            </IonItem>
          })
        }
      </IonList>

    </IonContent>
  }
}
