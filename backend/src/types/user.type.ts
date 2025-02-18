export interface IRegisterUser {
    full_name: string;
    phone_number: string;
    email: string;
    password: string;
    cornfirm_password: string;
}

export interface ILoginUser {
    email: string;
    password: string;
}

export interface IListUser {
    id: number;
    full_name: string;
    phone_number: string;
    email: string;
    password: string;
    created_At: Date;
    updated_At: Date;
    last_login: Date;
}

