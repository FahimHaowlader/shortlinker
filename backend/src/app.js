import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import router from "./route.js";

const app = express();

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

const allowedOrigins = [
  process.env.CLIENT_URL_PROD,
  process.env.CLIENT_URL_DEV, // Hardcode this temporarily to test
].filter(Boolean); // This removes any 'undefined' values from the array

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS. Origin was:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));



app.use(express.json({ limit: '1mb' })); // Parse JSON request bodies

// 2. CORS - Explicitly allow your frontend
// app.use(cors({
//   origin: "http://localhost:5173", 
//   credentials: true,
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// 3. PARSERS - Must be before routes
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser()); // Moved up

// 4. STATIC FILES
app.use(express.static('public'));


// This MUST be the last middleware in your app.js
app.use((err, req, res, next) => {
    // If the error is an instance of your apiError, use its statusCode
    // Otherwise, default to 500 (Internal Server Error)
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error(`[ERROR] ${statusCode} - ${message}`);

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors: err.errors || []
    });
});

// 5. ROUTES
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/v1', router);

export default app;