import express from 'express';
import storyRoutes from './routes/storyRoutes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 4000

app.use(express.json());

app.use('/story', storyRoutes);

app.get('/', async (req, res) => {
  res.send("Route working");
});

app.listen(port, () => (console.log("Server Started On Port: " + port)));