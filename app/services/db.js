
// import mongoose from "mongoose";


// connect();

// async function connect() {
//     try {
//         const res = await mongoose.connect("mongodb://localhost:27017/admin");
//         console.log("************* DATABASE CONNECTED *************", res.connection.host);
//     } catch (err) {
//         console.log("************* DATABASE IS NOT CONNECTED **********", err);
//     }
//   }


// export { mongoose, connect };


import mongoose from "mongoose"; 

const dbconnection = async () => {  
    try {
        const res = await mongoose.connect("mongodb://localhost:27017/admin", {useNewUrlParser: true, dbName: 'admin' });
        console.log("************* DATABASE CONNECTED *************", res.connection.host);
    } catch (err) {
        console.log("************* DATABASE IS NOT CONNECTED **********", err);
    }
}   

export default dbconnection;
