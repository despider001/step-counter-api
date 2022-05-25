import { Router, Request, Response, NextFunction } from "express";
import express from "express";
import { MemberDAO } from "../dao/Member";
import { TeamDAO } from "../dao/Team";
import { Team } from "../models/team";
import _ from "lodash";

export const router: Router = express.Router();


const teamDAO = new TeamDAO();
const memberDAO = new MemberDAO();

/**
 * @swagger
 * /members:
 *   get:
 *     description: Retrieve all members
 *     tags:
 *       - members
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: members
 *         schema:
 *           $ref: '#/definitions/Members'
 */
// get all the members
router.get("/", (req: Request, res: Response, next: NextFunction) => {
    const members = memberDAO.findAll();
    res.status(200).json(members);
});


/**
 * @swagger
 * /members:
 *   post:
 *     description: Create a new member
 *     tags:
 *       - members
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: parameters to create a member
 *         schema:
 *            type: object
 *            required:
 *               - name
 *               - team_id
 *            properties:
 *               name:
 *                  type: string
 *               team_id:
 *                  type: number
 *     responses:
 *       200:
 *         description: new member
 *         schema:
 *           $ref: '#/definitions/Member'
 *       422:
 *          description: invalid name or id
 */

// add a member
router.post("/", (req: Request, res: Response, next: NextFunction) => {
    const name = req.body.name;
    const teamId = +req.body.team_id;
    if(_.isEmpty(name.trim()) || _.isNaN(teamId)) {
        return res.status(422).json({ failed: "Either the name or id is not valid" });
    }
    const member = memberDAO.addOne(name, teamId);
    if(!member) {
        return res.status(422).json({ failed: "Either the name or id is not valid" });
    }
    res.status(200).json(member);
});


/**
 * @swagger
 * /members/{id}:
 *   get:
 *     description: Retrieve the member with the id
 *     tags:
 *       - members
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of the member
 *         type: number
 *     responses:
 *       200:
 *         description: member
 *         schema:
 *           $ref: '#/definitions/Member'
 */

// get a member details
router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
    const member = <Team>memberDAO.findById(+req.params.id);

    if (_.isEmpty(member)) {
        return res.status(404).json({ failed: `No member found with the id: ${req.params.id}` });
    }
    res.status(200).json(member);
});

/**
 * @swagger
 * /members/{id}/step-up:
 *   patch:
 *     description: increment the step count
 *     tags:
 *       - members
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of the member
 *         type: number
 *     responses:
 *       200:
 *         description: member's total steps
 *         type: number
 */

// increase step
router.patch("/:id/step-up", (req: Request, res: Response, next: NextFunction) => {
    const steps = memberDAO.increaseStepById(+req.params.id);
    res.status(200).json(steps);
});
