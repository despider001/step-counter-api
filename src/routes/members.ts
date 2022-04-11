import { Router, Request, Response, NextFunction } from "express";
import express from "express";
import { MemberDAO } from "../dao/Member";
import { TeamDAO } from "../dao/Team";
import { Team } from "../models/team";
import { isObjEmpty } from "../utils/is-obj-empty";

export const router: Router = express.Router();


const teamDAO = new TeamDAO();
const memberDAO = new MemberDAO();


// get all the members
router.get("/", (req: Request, res: Response, next: NextFunction) => {
    const members = memberDAO.findAll();
    res.status(200).json(members);
});


// add a member
router.post("/", (req: Request, res: Response, next: NextFunction) => {
    const name = req.body.name;
    const teamId = +req.body.team_id;
    const member = memberDAO.addOne(name, teamId);
    if(!member) {
        return res.status(422).json({ failed: "Either the name or id is not valid" });
    }
    res.status(200).json(member);
});


// get a member details
router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
    const member = <Team>memberDAO.findById(+req.params.id);

    if (isObjEmpty(member)) {
        return res.status(404).json({ failed: `No member found with the id: ${req.params.id}` });
    }
    res.status(200).json(member);
});


// increase step
router.get("/:id/step-up", (req: Request, res: Response, next: NextFunction) => {
    const steps = memberDAO.increaseStepById(+req.params.id);
    res.status(200).json(steps);
});

/*
    MEMBERS
    - CREATE member
        - /members POST
    - GET member
        - /members/:id 
    - PATCH /members score
        - increment member's score

*/