import mongoose from "mongoose"
import app from "./app.js"

(async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/gitsetup')
        console.log('Connected successfully to Mongo server')

        const onListening = () => {
            console.log("Listening on PORT 6000")
        }
        app.listen(6000, onListening)

    } catch (error) {
        console.error("error: ", error);
        throw err;
    }
})()