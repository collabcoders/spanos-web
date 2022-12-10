export class Video {
    videoId: number;
    title: string;
    year: number;
    file: string;
    tags: string;
    notes: string;
    description: string;
    duration: number;
    size: number;
    broll: boolean;
    date: Date;
    constructor(
        videoId: number,
        title: string,
        year: number,
        file: string,
        tags: string,
        notes: string,
        description: string,
        duration: number,
        size: number,
        broll: boolean,
        date: Date
    ) {
        this.videoId = videoId;
        this.title = title;
        this.year = year;
        this.file = file;
        this.tags = tags;
        this.notes = notes;
        this.description = description;
        this.duration = duration;
        this.size = size;
        this.broll = broll;
        this.date = date;
    }
}
