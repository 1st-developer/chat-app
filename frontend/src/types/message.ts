export interface ICreateMessageResponse {
    isSuccess: boolean;
    Message:   string;
    content:   Content;
}

export interface Content {
    id:         string;
    content:    string;
    created_At: Date;
    updated_At: Date;
    user_Id:    number;
}

export interface ICreateMessageBody {
    user_Id: number;
    content: string;
}
