export class Pokemon {

    id: number;
    name: string;
    image: string;
    type: string[];

    constructor(id?: number, name?: string, image?: string, type?: string[]){
        this.id = id || 0;
        this.name = name || "";
        this.image = image || "";
        this.type = type || null
    }
}
