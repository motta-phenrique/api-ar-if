
import dotenv from 'dotenv';
import app from "./app.js"
dotenv.config();

const PORT = parseInt(`${process.env.PORT || 3000}`);

app.listen(PORT, () => console.log(`Server is running at ${PORT}.`));