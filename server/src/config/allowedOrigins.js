const allowedOrigins = [
  process.env.ORIGIN,
  "http://localhost:8000",
  "http://localhost:5173",
  "http://localhost:5174",
];

module.exports = allowedOrigins;
