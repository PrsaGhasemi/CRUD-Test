
const mongoose = require('mongoose');

exports.connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Connected to ${connect.connection.host} `);
    } catch (err) {
        console.log(err);
    }
}