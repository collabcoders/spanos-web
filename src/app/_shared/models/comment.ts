export class Comment {
    commentId: number;
    userId: number;
    mediaId: number;
    mediaType: string;
    comment: string;
    parentId: number;
    dateAdded: Date;
    constructor(
        commentId: number,
        userId: number,
        mediaId: number,
        mediaType: string,
        comment: string,
        parentId: number,
        dateAdded: Date
    ) {
        this.commentId = commentId;
        this.userId = userId;
        this.mediaId = mediaId;
        this.mediaType = mediaType;
        this.comment = comment;
        this.parentId = parentId;
        this.dateAdded = dateAdded;
    }
}
