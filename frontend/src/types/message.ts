export interface ICreateMessageResponse {
    isSuccess: boolean;
    Message:   string;
    content:   Content[];
}

export interface Content {
    id:         string;
    content:    string;
    created_At: Date;
    updated_At: Date;
    user_Id:    number;
}

export interface ICreateMessageBody {
    content: string;
    to_user_Id: number;
    token: string;
}

export interface IListMessagesResponse {
    isSuccess: boolean;
    Message:   string;
    Messages:  Message[];
}

export interface Message {
    id:         string;
    content:    string;
    created_At: Date;
    updated_At: Date;
    user_Id:    number;
    to_user_Id: number;
}
