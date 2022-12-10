export class Bookmark {
    bookmarkId: number;
    userId: number;
    videoId: number;
    time: number;
    featured: boolean;
    dateAdded: Date;
    constructor(
        bookmarkId: number,
        userId: number,
        videoId: number,
        time: number,
        featured: boolean,
        dateAdded: Date
    ) {
        this.bookmarkId = bookmarkId;
        this.userId = userId;
        this.videoId = videoId;
        this.time = time;
        this.featured = featured;
        this.dateAdded = dateAdded;
    }
}
