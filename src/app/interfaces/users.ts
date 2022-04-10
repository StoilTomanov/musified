export interface IUser {
    _id : string,
    email: string,
    username: string,
    dateJoined: string,
    profilePicture: string,
    passed_courses: string,
    level: string,
    isAdmin: string,
    accessToken: string
    // TODO: add user role - admin / not-admin
}