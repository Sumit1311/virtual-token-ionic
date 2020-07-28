export interface Customers {
    customers: Customer[]
    showLoader: boolean;
}

export interface Customer {
    token: string;
    mobileNo: string;
}

export interface CustomerListProps {
    accountId: string;
    customers: Customer[];
    showLoader: boolean;
}