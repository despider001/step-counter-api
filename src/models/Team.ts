export type TeamProps = {
    id: number
    name: string
    steps: number
}

export class Team {
    public id: number
    public name: string
    public steps: number
    
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.steps = 0;
    }
}
