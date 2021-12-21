require("rootpath")();
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./src/_middleware/error-handler");

const db = require("./src/db/models");

const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const listRoutes = require("./src/routes/list.routes");
const commentRoutes = require("./src/routes/comments.routes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", listRoutes);
app.use("/api/v1", commentRoutes);

// Public API Views
app.use(express.static(path.resolve("./public")));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.PORT || 3000;

db.sequelize.sync().then((result) => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
