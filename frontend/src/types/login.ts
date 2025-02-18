export interface ILoginResponse {
    isSuccess: boolean;
    Message:   string;
    user:      User;
    token:     string;
}

export interface User {
    id:           number;
    email:        string;
    full_name:    string;
    phone_number: string;
    created_At:   Date;
    updated_At:   Date;
    last_login:   Date;
}

export interface ILoginBody{
    email: string;
    password: string;
}