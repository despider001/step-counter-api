/**
 * We will not any persisting database. Instead, we will use global variables.
 */

export class Database {
    constructor() {
        (global as any).TEAMS = [];
        (global as any).MEMBERS = [];
    }
}
