import { Member, MemberProps } from "../models/member";
import { TeamProps } from "../models/team";
import { isObjEmpty } from "../utils/is-obj-empty";
import { TeamDAO } from "./Team";

export class MemberDAO {
    private teamDAO =  new TeamDAO();

    public addOne = (name: MemberProps["name"], team_id: MemberProps["team_id"]): null | Member => {
        const team = this.teamDAO.findById(team_id);

        if(isObjEmpty(team)) {
            return null;
        }
        const length = (global as any).MEMBERS.length;

        const member = new Member({ id: length, name, steps: 0, team_id });
        (global as any).MEMBERS.push(member);
        return member;
    }

    public findAll = (): [] | Member[] => {
        return [ ...(global as any).MEMBERS ];  /*spread expression is used to protect the Array/Object from mutation*/
    }

    public findById = (id: MemberProps["id"]): undefined | Member => {
        return { ...(global as any).MEMBERS[id] };
    }

    public findByTeamId = (id: TeamProps["id"]): [] | Member[] => {
        const members: Member[] = (global as any).MEMBERS;
        const result = members.filter(x => x.team_id === id);
        return result;
    }

    public increaseStepById = (id: MemberProps["id"]): number => {
        const member: Member = (global as any).MEMBERS[id];
        if(typeof member === "undefined") return 0;
        member.steps++;
        this.teamDAO.increaseStepById(member.team_id);
        return member.steps;
    }

}
