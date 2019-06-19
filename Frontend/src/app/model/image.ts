export class Image {
    imageb64: string;
    position: string;
    size: string;

    constructor(imageb64: string, position: string, size: string){
        this.imageb64 = imageb64;
        this.position = position;
        this.size = size;
    }
}