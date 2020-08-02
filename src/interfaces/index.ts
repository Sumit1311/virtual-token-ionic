import { FromTo } from "moment";

export interface Customers {
    customers: Customer[];
}

export interface Customer {
    token: string;
    mobileNo: string;
    allotedSlot: FromTo;
}

export interface Account {
    name: string;
    accountId: string;
}

export interface CustomerListProps {
    customers: Customer[];
}