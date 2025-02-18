export interface IListUsersResponse {
    isSuccess: boolean;
    message:   string;
    users:     User[];
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

