/**
 * @swagger
 * definitions:
 *   Team:
 *     type: object
 *     required:
 *       - id
 *       - name
 *       - steps
 *     properties:
 *       id:
 *         type: number
 *       name:
 *         type: string
 *       steps:
 *         type: number
 *   Teams:
 *     type: array
 *     items:
 *       $ref: '#/definitions/Team'
 */

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
