const allowedOrigins = [
    process.env.ORIGIN,
    'http://localhost:8000',
    'http://localhost:5173',
]

module.exports = allowedOrigins;