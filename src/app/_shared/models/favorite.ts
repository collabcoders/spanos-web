export class Favorite {
    favoriteId: number;
    userId: number;
    mediaId: number;
    mediaType: string;
    dateAdded: Date;
    constructor(
        favoriteId: number,
        userId: number,
        mediaId: number,
        mediaType: string,
        dateAdded: Date
    ) {
        this.favoriteId = favoriteId;
        this.userId = userId;
        this.mediaId = mediaId;
        this.mediaType = mediaType;
        this.dateAdded = dateAdded;
    }
}
