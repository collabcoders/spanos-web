export class Photo {
    imageId: number;
    title: string;
    year: number;
    file: string;
    tags: string;
    notes: string;
    description: string;
    duration: number;
    size: number;
    date: Date;
    constructor(
        imageId: number,
        title: string,
        year: number,
        file: string,
        tags: string,
        notes: string,
        description: string,
        duration: number,
        size: number,
        date: Date
    ) {
        this.imageId = imageId;
        this.title = title;
        this.year = year;
        this.file = file;
        this.tags = tags;
        this.notes = notes;
        this.description = description;
        this.duration = duration;
        this.size = size;
        this.date = date;
    }
}
