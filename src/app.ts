import express from "express";
import { Database } from "./config/db";
import { router as teamsRouter } from "./routes/teams";
import { router as membersRouter } from "./routes/members";
import { router as swaggerRouter } from "./routes/swagger";

// initiate database
new Database();

// Create Express server
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("port", process.env.PORT || 3000);

app.use("/api/docs", swaggerRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/members", membersRouter);
app.all("*", (req, res) => res.status(404).json({ status: "404 - Not Found" }));

export default app;