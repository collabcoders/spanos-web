export class Video {
    videoId: number;
    title: string;
    featuring: string;
    year: number;
    file: string;
    screenshot: string;
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
        featuring: string,
        year: number,
        file: string,
        screenshot: string,
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
        this.featuring = featuring;
        this.year = year;
        this.file = file;
        this.screenshot = screenshot;
        this.tags = tags;
        this.notes = notes;
        this.description = description;
        this.duration = duration;
        this.size = size;
        this.broll = broll;
        this.date = date;
    }
}
