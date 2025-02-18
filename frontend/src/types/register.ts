export interface IRegisterResponse {
    isSuccess: boolean;
    Message:   string;
    user:      User;
}

export interface User {
    id:           number;
    full_name:    string;
    phone_number: string;
    email:        string;
    created_At:   Date;
    updated_At:   Date;
    last_login:   Date;
}

export interface IRegisterBody {
    full_name: string;
    phone_number: string;
    email: string;
    password: string;
    cornfirm_password: string;
}
