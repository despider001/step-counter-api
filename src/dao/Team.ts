import { Team, TeamProps } from "../models/team";

export class TeamDAO {
    public addOne = (name: TeamProps["name"]): Team => {
        const length = (global as any).TEAMS.length;
        const newTeam = new Team(length, name);
        (global as any).TEAMS.push(newTeam);
        return newTeam;
    }

    public findAll = (): [] | Team[] => {
        return [ ...(global as any).TEAMS ]; // spread expression is used to protect the Array/Object from mutation
    }

    public findById = (id: TeamProps["id"]): undefined | Team => {
        return { ...(global as any).TEAMS[id] };
    }

    public increaseStepById = (id: TeamProps["id"]): number => {
        const team = (global as any).TEAMS[id];
        if(typeof team === "undefined") return 0;
        return team.steps++;
    }

}
