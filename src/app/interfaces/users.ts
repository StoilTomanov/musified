export interface IUser {
    _id : string,
    email: string,
    username: string,
    dateJoined: string,
    profilePicture: string,
    passed_courses: string,
    subscriptions: [],
    level: string,
    isAdmin: string,
    accessToken: string
}