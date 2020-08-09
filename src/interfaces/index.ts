import { FromTo } from "moment";

export interface Customers {
    customers: Customer[];
}

export interface Customer {
    token: string;
    mobileNo: string;
    allotedSlot: FromTo;
    active: boolean;
    queueId:string;
}

export interface Account {
    name: string;
    accountId: string;
}