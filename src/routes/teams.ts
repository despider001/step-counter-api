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
 * /teams:
 *   get:
 *     description: Retrieve all teams
 *     tags:
 *       - teams
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: teams
 *         schema:
 *           $ref: '#/definitions/Teams'
 */

// get all the teams
router.get("/", (req: Request, res: Response, next: NextFunction) => {
    const teams = teamDAO.findAll();
    res.status(200).json(teams);
});

/**
 * @swagger
 * /teams:
 *   post:
 *     description: Create a new team
 *     tags:
 *       - teams
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: parameters to create a team
 *         schema:
 *            type: object
 *            required:
 *               - name
 *            properties:
 *               name:
 *                  type: string
 *     responses:
 *       200:
 *         description: new team
 *         schema:
 *           $ref: '#/definitions/Team'
 *       422:
 *          description: invalid name
 */

// add a team
router.post("/", (req: Request, res: Response, next: NextFunction) => {
    const name = req.body.name;
    if(_.isEmpty(name.trim())) {
        return res.status(422).json({ failed: "invalid name" });
    }
    const team = teamDAO.addOne(name);
    res.status(200).json(team);
});


/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     description: Retrieve an specific team
 *     tags:
 *       - teams
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the team to retrieve
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: team with members
 *         schema:
 *           type: object
 *           properties:
 *              team:
 *                 $ref: '#/definitions/Team'
 *              members:
 *                  $ref: '#/definitions/Members'
 */

// get a team details
router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
    const team = <Team>teamDAO.findById(+req.params.id);

    if (_.isEmpty(team)) {
        return res.status(404).json({ failed: `No team found with the id: ${req.params.id}` });
    }
    const members = memberDAO.findByTeamId(team.id);
    res.status(200).json({ team, members });
});

