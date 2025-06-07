import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
1;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      description: "API documentation for the application",
    },
    servers: [
      {
        url: "http://localhost:3000/",
        description: "Development server",
      },
    ],
  },
};
const specs = swaggerJSDoc(swaggerOptions);
export default specs;
