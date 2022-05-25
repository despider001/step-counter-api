import request from "supertest";
import app from "../app";

describe("GET /api/teams", () => {
    it("should return 200 OK", () => {
        return request(app).get("/api/teams")
            .expect(200, []);
    });
});

describe("POST /api/teams", () => {
    it("proper request should return 200 OK", () => {
        return request(app).post("/api/teams")
            .send({ name: "dev" })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, { id: 0, name: "dev", steps: 0 });
    });

    it("invalid name should return 422", () => {
        return request(app).post("/api/teams")
            .send({ name: " " })
            .set("Accept", "application/json")
            .expect(422);
    });
});

describe("GET /api/teams/:id", () => {
    it("should return 200 OK", () => {
        return request(app).get("/api/teams/0")
            .expect(200);
    });
});

describe("POST /api/members", () => {
    it("proper body should return 200 OK", () => {
        return request(app).post("/api/members")
            .send({ name: "john", team_id: 0 })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200);
    });

    it("missing body should return 422", () => {
        return request(app).post("/api/members")
            .send({ name: "john" })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(422);
    });
});
describe("GET /api/members", () => {
    it("should return 200 OK", () => {
        return request(app).get("/api/members")
            .expect(200);
    });
});

describe("GET /api/members/:id", () => {
    it("should return 200 OK", () => {
        return request(app).get("/api/members/0")
            .expect(200, { id: 0, name: "john", steps: 0, team_id: 0 });
    });
});

describe("PATCH /api/members/:id/step-up", () => {
    it("should return 200 OK", () => {
        return request(app).patch("/api/members/0/step-up")
            .send({})
            .set("Accept", "application/json")
            .expect(200, "1");
    });

    it("wrong id would return 0", () => {
        return request(app).patch("/api/members/5/step-up")
            .send({})
            .set("Accept", "application/json")
            .expect(200, "0");
    });
});