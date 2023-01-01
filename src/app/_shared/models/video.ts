export class Video {
    videoId: number;
    title: string;
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
    hls:string;
    gif:string;
    pic:string;
    src:string;
    constructor(
        videoId: number,
        title: string,
        year: number,
        file: string,
        screenshot: string,
        tags: string,
        notes: string,
        description: string,
        duration: number,
        size: number,
        broll: boolean,
        date: Date,
        hls:string,
        gif:string,
        pic:string,
        src:string
    ) {
        this.videoId = videoId;
        this.title = title;
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
        this.hls=hls;
        this.gif=gif;
        this.pic=pic;
        this.src=src;
    }
}
