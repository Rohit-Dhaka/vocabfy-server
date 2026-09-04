import express from 'express'
import cors from 'cors'
import route from './routes/index.route.js'
import cookieParser from 'cookie-parser'


const app = express()


app.use(express.json())
// app.use(cors({origin:"https://vocabfy-beta.vercel.app" , credentials:true}))
const allowedOrigins = [
  "http://localhost:5173",
  "https://vocabfy-beta.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(cookieParser())

app.get("/health", (req, res) => {
  return res.status(200).json({
    status: "ok",
    message: "Vocabfy server is healthy",
  });
});

app.use('/api', route)

export default app;

