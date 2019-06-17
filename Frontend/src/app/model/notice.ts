export class Notice { 
    author: string;
    openDate: Date;
    closeDate: Date;
    title: string;
    content: string;

    constructor(author: string, openDate: Date, closeDate: Date,
        title: string, content: string){
        
        this.author = author;
        this.openDate = openDate;
        this.closeDate = closeDate;
        this.title = title;
        this.content = content;
    }
}