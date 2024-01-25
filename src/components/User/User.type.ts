export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    place: string;
}

export enum PageEnum {
    list,
    add,
    edit,
}