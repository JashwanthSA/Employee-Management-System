import mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config();
const con = mysql.createConnection({
    host: process.env.DB_HOST,
    // host: "db",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})
console.log(process.env.DB_HOST, process.env.DB_PASSWORD);
con.connect(function(err) {
    if(err) {
        console.log("connection error")
        console.log(err);
    } else {
        console.log("Connected")
    }
})

export default con;

