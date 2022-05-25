import { expect, test } from "@jest/globals";
import { Database } from "../config/db";
import { Team } from "../models/team";
import { TeamDAO } from "./Team";

const teamDAO = new TeamDAO();

beforeAll(() => {
    // initiate the database
    new Database();

    // create some dummy data to test
    (<Team[]>(global as any).TEAMS) = [
        { id: 0, name: "red", steps: 0},
        { id: 1, name: "green", steps: 0}
    ];
});

describe("teamDAO.addOne", () => {
    test("should be add correctly", () => {
        expect(teamDAO.addOne("blue")).toBeInstanceOf(Team);
    });
});

describe("teamDAO.findAll", () => {
    test("should find all 3 teams", () => {
        expect(teamDAO.findAll().length).toBe(3);
    });
});

describe("teamDAO.findById", () => {
    test("should find team with id", () => {
        expect(teamDAO.findById(1)).toMatchObject({ id: 1, name: "green", steps: 0});
    });
});

describe("teamDAO.increaseStepById", () => {
    test("should increase step by 1", () => {
        expect(teamDAO.increaseStepById(0)).toBe(1);
    });
});
