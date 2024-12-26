const express = require('express');
const {ServerConfig, Logger, connectDB} = require('./config');
const apiRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api',apiRoutes);

connectDB()
.then(() => {

    app.on("errror", (error) => {
        console.log("Error in Server running: ", error);
        throw error
    })

    app.listen(ServerConfig.PORT || 8000, () => {
        console.log(`⚙ Server is running at port : ${ServerConfig.PORT}`);
        Logger.info("Successfully started the server");
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
