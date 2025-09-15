import express from 'express';
import storyRoutes from './routes/storyRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT || 4000

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use('/api/story', storyRoutes);

app.get('/', async (req, res) => {
  res.send("Route working");
});

app.listen(port, () => (console.log("Server Started On Port: " + port)));