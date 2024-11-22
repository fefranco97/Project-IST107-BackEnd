const cors = require("cors");

const corsHandler = cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "UPDATE", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

module.exports = corsHandler;
