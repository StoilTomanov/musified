export interface ILesson { // TODO: the database model will likely change, ensure to align the interface with it
    _id: number,
    name: string,
    description: string,
    theory: string,
    level: string,
    duration: number,
    videoUrl: string,
    imagePreviewUrl:string,
    progress: number,
    createdOn: string,
    subscribers: [],
    views: number,
    rating: [],
    owner: string,
    __v: number,
}