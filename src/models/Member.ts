/**
 * @swagger
 * definitions:
 *   Member:
 *     type: object
 *     required:
 *       - id
 *       - name
 *       - steps
 *       - team_id
 *     properties:
 *       id:
 *         type: number
 *       name:
 *         type: string
 *       steps:
 *         type: number
 *       team_id:
 *         type: number
 *   
 *   Members:
 *     type: array
 *     items:
 *       $ref: '#/definitions/Member'
 */

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
