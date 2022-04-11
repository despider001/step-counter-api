export type MemberProps = {
    id: number
    name: string
    steps: number
    team_id: number
}

export class Member {
    public id: number
    public name: string
    public steps: number
    public team_id: number

    constructor(props: MemberProps) {
        this.id = props.id;
        this.name = props.name;
        this.steps = props.steps;
        this.team_id = props.team_id;
    }
}

/*

const TEAMS = [
    {
        id: 0,
        name: 'red team'
    },
    {
        id: 1,
        name: 'green team'
    }
]

const MEMBERS = [
    {
        id: 0,
        name: 'sam',
        steps: 0,
        team_id: 0
    },
    {
        id: 1,
        name: 'john',
        steps: 5,
        team_id: 1
    },
]
*/
