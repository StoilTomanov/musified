export interface IUser {
    _id : number,
    email: string,
    username: string,
    isAdmin: string,
    accessToken: string
    // TODO: add user role - admin / not-admin
}