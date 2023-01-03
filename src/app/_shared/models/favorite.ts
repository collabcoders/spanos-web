export class Favorite {
    favoriteId: number;
    userId: number;
    videoId: number;
    videoType: string;
    dateAdded: Date;
    constructor(
        favoriteId: number = 0,
        userId: number = 0,
        videoId: number = 0,
        videoType: string = '',
        dateAdded: Date = new Date()
    ) {
        this.favoriteId = favoriteId;
        this.userId = userId;
        this.videoId = videoId;
        this.videoType = videoType;
        this.dateAdded = dateAdded;
    }
}
