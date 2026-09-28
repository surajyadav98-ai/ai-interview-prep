const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.set("trust proxy", 1)
app.use(express.json())
app.use(cookieParser())

const allowedOrigins = [
    "http://localhost:5173",
    "https://ai-interview-prep-two-eta.vercel.app"
]

const isAllowedOrigin = (origin) =>
    allowedOrigins.includes(origin) ||
    /^https:\/\/ai-interview-prep[a-z0-9-]*-surajyadav98-ais-projects\.vercel\.app$/.test(origin)

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || isAllowedOrigin(origin)) {
            return callback(null, true)
        }
        console.log("Blocked by CORS, origin:", origin)
        return callback(null, false)
    },
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



module.exports = app
