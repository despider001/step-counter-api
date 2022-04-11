import express from "express";
import { Database } from "./config/db";
import { TeamDAO } from "./dao/Team";
import bodyParser from "body-parser";
import { router as teamsRouter } from "./routes/teams";
import { router as membersRouter } from "./routes/members";

// initiate database
new Database();

// Create Express server
const app = express();

// app.use(require("sanitize").middleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
    const teamDAO = new TeamDAO();
    console.log("here", teamDAO.addOne("mk"));
    res.status(200).json({success: teamDAO.findAll()});
});

app.use("/teams", teamsRouter);
app.use("/members", membersRouter);

export default app;