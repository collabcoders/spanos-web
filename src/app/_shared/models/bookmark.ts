export class Bookmark {
    bookmarkId: number;
    userId: number;
    videoId: number;
    time: number;
    title: string;
    featured: number;
    dateAdded: Date;
    constructor(
        bookmarkId: number = 0,
        userId: number = 0,
        videoId: number = 0,
        time: number = 0,
        title: string = '',
        featured: number = 0,
        dateAdded: Date = new Date()
    ) {
        this.bookmarkId = bookmarkId;
        this.userId = userId;
        this.videoId = videoId;
        this.time = time;
        this.title = title;
        this.featured = featured;
        this.dateAdded = dateAdded;
    }
}
