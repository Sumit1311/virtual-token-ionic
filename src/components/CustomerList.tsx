import './CustomerList.css';
import React from 'react';
import { IonList, IonItem, IonLabel, IonCheckbox, IonContent } from '@ionic/react';
import AccountAPIHelper from "../helper/api/Accounts";

interface CustomerListProps {
  accountId: string;
}

interface Customers {
  customers: Customer[]
}

interface Customer {
  token: string;
  mobileNo: string;
}

export default class CustomerList extends React.Component<CustomerListProps, Customers>{
  public state: Customers;
  public accounts: AccountAPIHelper;

  constructor(props: CustomerListProps) {
    super(props);
    this.state = {
      customers: []
    };
    this.accounts = new AccountAPIHelper();
  }

  async componentDidMount() {
    const customers = await this.accounts.getCustomersInQueue(this.props.accountId);
    this.setState({
      customers: customers
    });
  }

  render() {
    return <IonContent>
      {/*-- List of Text Items --*/}
      <IonList>
        {
          this.state.customers.map((customer: Customer) => {
            return <IonItem key={customer.mobileNo}><IonLabel><b>{customer.token}</b> <h6>{customer.mobileNo}</h6></IonLabel>
              </IonItem>
          })
        }
      </IonList>
    </IonContent>
  }
}
