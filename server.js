const express = require("express");
const path = require("path");

const app = express();
const port = 8000;

const connectToMongo = require("./db");
connectToMongo();

const staticPath = path.join(__dirname, "public");

app.use(express.static(staticPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,"public","index.html"))
})


const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);


app.listen(port, () => {
  console.log(`your server is started at http://localhost:${port}`);
});
