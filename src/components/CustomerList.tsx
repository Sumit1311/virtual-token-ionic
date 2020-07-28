import './CustomerList.css';
import React from 'react';
import { IonList, IonItem, IonLabel, IonContent } from '@ionic/react';
import CustomerAPIHelper from "../helper/api/customer";
import { CustomerListProps, Customer } from '../interfaces';

export default class CustomerList extends React.Component<CustomerListProps>{
  public accounts: CustomerAPIHelper;

  constructor(props: CustomerListProps) {
    super(props);
    this.accounts = new CustomerAPIHelper();
  }

  render() {
    return <IonContent>
      {/*-- List of Text Items --*/}
      <IonList>
        {
          this.props.customers.map((customer: Customer) => {
            return <IonItem key={customer.mobileNo}><IonLabel><b>{customer.token}</b> <h6>{customer.mobileNo}</h6></IonLabel>
            </IonItem>
          })
        }
      </IonList>
    </IonContent>
  }
}
