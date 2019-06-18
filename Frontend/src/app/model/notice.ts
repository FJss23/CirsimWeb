export class Notice { 
    author: string;
    openDate: Date;
    title: string;
    content: string;

    constructor(author: string, openDate: Date, title: string, content: string){
        
        this.author = author;
        this.openDate = openDate;
        this.title = title;
        this.content = content;
    }
}