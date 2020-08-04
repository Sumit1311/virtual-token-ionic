import React, { FormEvent } from 'react';
import { IonContent, IonList, IonItemDivider, IonItem, IonInput, IonLabel, IonDatetime, IonButton } from '@ionic/react';
import moment from "moment";
import NotificationToast from './MessageToast';
import UpdateAccountRequest from '../helper/api/requests/UpdateAccountRequest';
import AccountAPIHelper from '../helper/api/account';
import './AdminSettings.css'

class AdminSettings extends React.Component<any, any> {
    private accounts: AccountAPIHelper;

    constructor(props: any) {
        super(props);
        this.state = {
            slotDuration: this.props.account.slotDuration.minutes,
            customersPerSlot: this.props.account.customersPerSlot,
            dailyTimingFrom: moment().hours(this.props.account.dailyTiming.from.hours)
                .minutes(this.props.account.dailyTiming.from.minutes)
                .format("HH:mm"),
            dailyTimingTo: moment()
                .hours(this.props.account.dailyTiming.to.hours)
                .minutes(this.props.account.dailyTiming.to.minutes)
                .format("HH:mm"),
            isSubmitting: false,
            errorText: ""
        }
        this.accounts = new AccountAPIHelper();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    showErrorText(text: string) {
        this.setState({ errorText: text });
    }

    hideErrorText() {
        this.setState({ errorText: null });
    }

    getNotificationToast() {
        return <NotificationToast errorText={this.state.errorText} />
    }

    onChange(event: any) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({ [name]: value });
    }

    async onSubmit(event: FormEvent) {
        event.preventDefault();
        this.hideErrorText();
        this.props.onShowLoader();
        this.setState({ isSubmitting: true });
        let from = moment(this.state.dailyTimingFrom, "HH:mm");
        let to = moment(this.state.dailyTimingTo, "HH:mm");
        let customersPerSlot = parseInt(this.state.customersPerSlot);
        let slotDuration = parseInt(this.state.slotDuration);

        try {
            await this.accounts.updateAccount(new UpdateAccountRequest()
                .setCustomersPerSlot(customersPerSlot)
                .setSlotDuration(slotDuration)
                .setDailyTimingFrom(from.get("hours"), from.get("minutes"))
                .setDailyTimingTo(to.get("hours"), to.get("minutes")));
            this.props.onHideLoader();
        } catch (error) {
            this.showErrorText(error.message);
            console.log(error);
        }
        this.setState({ isSubmitting: false });
        this.props.onHideLoader();
    }

    render() {
        let state = this.state;

        return <IonContent>
            {this.getNotificationToast()}
            <form className="account-update-form" onSubmit={this.onSubmit}>
                <IonList>
                    <IonItemDivider>Account Name</IonItemDivider>
                    <IonItem>
                        <IonInput value={this.props.account.name} disabled ></IonInput>
                    </IonItem>
                    <IonItemDivider>Missed Call Number</IonItemDivider>
                    <IonItem>
                        <IonInput value={this.props.account.missedCallNumber} disabled></IonInput>
                    </IonItem>
                    <IonItemDivider>Slot Duration</IonItemDivider>
                    <IonItem>
                        <IonInput type="number" name="slotDuration" value={`${state.slotDuration}`} onIonChange={this.onChange}></IonInput>
                        <IonLabel > mins</IonLabel>
                    </IonItem>
                    <IonItemDivider>Customers Per Slot</IonItemDivider>
                    <IonItem>
                        <IonInput type="number" name="customersPerSlot" value={state.customersPerSlot} onIonChange={this.onChange}></IonInput>
                    </IonItem>
                    <IonItemDivider>Open Duration</IonItemDivider>
                    <IonItem>
                        <IonLabel>From : </IonLabel>
                        <IonDatetime name="dailyTimingFrom" displayFormat="hh:mm a" value={`${state.dailyTimingFrom}`} onIonChange={this.onChange}></IonDatetime>
                    </IonItem>
                    <IonItem>
                        <IonLabel>To : </IonLabel>
                        <IonDatetime displayFormat="hh:mm a" name="dailyTimingTo" value={`${state.dailyTimingTo}`} onIonChange={this.onChange}></IonDatetime>
                    </IonItem>
                    <IonButton type="submit">Update</IonButton>
                </IonList>
            </form>
        </IonContent>
    }
}

export default AdminSettings;