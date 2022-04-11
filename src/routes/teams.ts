import { Router, Request, Response, NextFunction } from "express";
import express from "express";
import { MemberDAO } from "../dao/Member";
import { TeamDAO } from "../dao/Team";
import { Team } from "../models/team";
import { isObjEmpty } from "../utils/is-obj-empty";

export const router: Router = express.Router();

const teamDAO = new TeamDAO();
const memberDAO = new MemberDAO();


// get all the teams
router.get("/", (req: Request, res: Response, next: NextFunction) => {
    const teams = teamDAO.findAll();
    res.status(200).json(teams);
});


// add a team
router.post("/", (req: Request, res: Response, next: NextFunction) => {
    const name = req.body.name;
    const team = teamDAO.addOne(name);
    res.status(200).json(team);
});


// get a team details
router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
    const team = <Team>teamDAO.findById(+req.params.id);

    if (isObjEmpty(team)) {
        return res.status(404).json({ failed: `No team found with the id: ${req.params.id}` });
    }
    const members = memberDAO.findByTeamId(team.id);
    res.status(200).json({ team, members });
});

/*
    TEAMS
    - Get Teams
        - /teams
        - brings all teams with score
    - Get teamDAO
        - /teams/:id
        - brings members and score
    - Create teamDAO
        - /teams POST
        - creats an empty team

*/