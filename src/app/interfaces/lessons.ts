export interface ILesson { // TODO: the database model will likely change, ensure to align the interface with it
    _id: number,
    name: string,
    description: string,
    level: string,
    duration: number,
    videoUrl: string,
    imagePreviewUrl:string,
    progress: number,
    createdOn: string,
    views: number,
    __v: number,
}