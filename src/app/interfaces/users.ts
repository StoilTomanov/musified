export interface IUser {
    _id : string,
    email: string,
    username: string,
    isAdmin: string,
    accessToken: string
    // TODO: add user role - admin / not-admin
}