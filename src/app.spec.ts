import request from "supertest";
import app from "./app";

describe("GET /", () => {
    it("should return 404 Not Found", () => {
        return request(app).get("/")
            .expect(404);
    });
});
