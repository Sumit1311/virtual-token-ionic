import React from 'react';
import { IonContent, IonList, IonItemDivider, IonItem, IonInput, IonLabel, IonDatetime } from '@ionic/react';
import moment from "moment";

class AdminSettings extends React.Component<any, any> {
    render() {
        let account = this.props.account;
        let from = moment()
            .hours(account.dailyTiming.from.hours)
            .minutes(account.dailyTiming.from.minutes)
            .format("HH:mm");

        let to = moment()
            .hours(account.dailyTiming.to.hours)
            .minutes(account.dailyTiming.to.minutes)
            .format("HH:mm");


        return <IonContent>
            <IonList>
                <IonItemDivider>Account Name</IonItemDivider>
                <IonItem>
                    <IonInput value={account.name} disabled ></IonInput>
                </IonItem>
                <IonItemDivider>Missed Call Number</IonItemDivider>
                <IonItem>
                    <IonInput value={account.missedCallNumber} ></IonInput>
                </IonItem>
                <IonItemDivider>Slot Duration</IonItemDivider>
                <IonItem>
                    <IonInput value={`${account.slotDuration.minutes}`} ></IonInput>
                    <IonLabel > mins</IonLabel>
                </IonItem>
                <IonItemDivider>Customers Per Slot</IonItemDivider>
                <IonItem>
                    <IonInput value={account.customersPerSlot} ></IonInput>
                </IonItem>
                <IonItemDivider>Open Duration</IonItemDivider>
                <IonItem>
                    <IonLabel className="datetime-label">From : </IonLabel>
                    <IonDatetime displayFormat="hh:mm a" value={`${from}`}></IonDatetime>
                </IonItem>
                <IonItem>
                    <IonLabel className="datetime-label">To : </IonLabel>
                    <IonDatetime displayFormat="hh:mm a" value={`${to}`}></IonDatetime>
                </IonItem>
            </IonList>
        </IonContent>
    }
}

export default AdminSettings;