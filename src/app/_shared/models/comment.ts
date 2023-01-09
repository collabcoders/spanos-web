export class Comment {
    commentId: number;
    userId: number;
    mediaId: number;
    mediaType: string;
    user: string;
    comment: string;
    parentId: number;
    dateAdded: Date;
    constructor(
        commentId: number = 0,
        userId: number = 0,
        mediaId: number = 0,
        mediaType: string = '',
        user: string = '',
        comment: string = '',
        parentId: number = 0,
        dateAdded: Date = new Date(),
    ) {
        this.commentId = commentId;
        this.userId = userId;
        this.mediaId = mediaId;
        this.mediaType = mediaType;
        this.user = user;
        this.comment = comment;
        this.parentId = parentId;
        this.dateAdded = dateAdded;
    }
}
