import swaggerJSDoc from "swagger-jsdoc";

const options = {
  openapi: "3.0.0",
  info: {
    title: "Your API Title",
    description: "API documentation",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
};

const specs = swaggerJSDoc(options);
export default specs;
