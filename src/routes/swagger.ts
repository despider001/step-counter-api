import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export const router = express.Router();

const options = {
  swaggerDefinition: {
    info: {
      title: "Step Counter API",
      version: "0.1.0",
      description: "RESTful API documentation",
      contact: {
        email: "r.sadikur64@gmail.com",
      },
    },
    tags: [
      {
        name: "teams",
        description: "Teams API",
      },
      {
        name: "members",
        description: "Members API",
      },
    ],
    schemes: ["http"],
    host: "localhost:3000",
    basePath: "/api",
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

router.get("/json", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
