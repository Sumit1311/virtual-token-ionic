export interface Customers {
    customers: Customer[]
}

export interface Customer {
    token: string;
    mobileNo: string;
}

export interface CustomerListProps {
    accountId: string;
    customers: Customer[]
}