import { expect, test } from "@jest/globals";
import { Database } from "../config/db";
import { Member } from "../models/member";
import { Team } from "../models/team";
import { MemberDAO } from "./Member";

const memberDAO = new MemberDAO();

beforeAll(() => {
    // initiate the database
    new Database();

    // create some dummy data to test

    (<Team[]>(global as any).TEAMS) = [
        { id: 0, name: "red", steps: 0},
        { id: 1, name: "green", steps: 0}
    ];

    (<Member[]>(global as any).MEMBERS ) = [
        { id: 0, name: "john", steps: 0, team_id: 1},
        { id: 1, name: "jane", steps: 0, team_id: 0}
    ];
});

describe("memberDAO.addOne", () => {
    test("should be add correctly", () => {
        expect(memberDAO.addOne("mac", 1)).toBeInstanceOf(Member);
    });
});

describe("memberDAO.findAll", () => {
    test("should find all 3 teams", () => {
        expect(memberDAO.findAll().length).toBe(3);
    });
});

describe("memberDAO.findById", () => {
    test("should find team with id", () => {
        expect(memberDAO.findById(0)).toMatchObject({ id: 0, name: "john", steps: 0, team_id: 1});
    });
});

describe("memberDAO.increaseStepById", () => {
    test("should increase step by 1", () => {
        expect(memberDAO.increaseStepById(0)).toBe(1);
    });
});
