export interface IUser {
    _id: string,
    email: string,
    username: string,
    dateJoined: string,
    profilePicture: string,
    passedCourses: string,
    subscriptions: any[],
    level: string,
    isAdmin: string,
    accessToken: string,
}