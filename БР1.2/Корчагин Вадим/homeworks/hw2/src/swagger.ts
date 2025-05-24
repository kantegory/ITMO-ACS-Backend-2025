const swaggerAutogen = require("swagger-autogen")()

const doc = {
  info: {
    title: "Fitness Platform API",
    description: "Auto-generated docs for fitness platform",
    version: "1.0.0"
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http"],
  tags: [
  ]
}

const outputFile = "./swagger-output.json"
const endpointsFiles = ["./src/index.ts"]

swaggerAutogen(outputFile, endpointsFiles, doc)
