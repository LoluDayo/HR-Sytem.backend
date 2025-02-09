import express, {Application} from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url';
import { connectDB } from './config/db';
import routes from './routes/routes'



dotenv.config()

const app: Application = express();

const PORT = process.env.PORT || 5000

app.use(express.json());

// if(process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, "/frontend/dist")))

//     app.get("*", (req, res) => (res.sendFile(path.resolve(__dirname, "frontend","dist","server", "app", "index.html"))))
// }


// console.log(__dirname); // Check if it's work


app.use("/api", routes)

app.listen(PORT, () => {
    connectDB()
    console.log("Sever started at http://localhost:" + PORT)
})

// GebIhbuopM0fIdAs