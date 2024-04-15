import { PrismaClient } from "@prisma/client";

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
}

export default prisma;






// import mongoose from "mongoose"; 

// const dbconnection = async () => {  
//     try {
//         const res = await mongoose.connect("mongodb://localhost:27017/admin");
//         console.log("************* DATABASE CONNECTED *************", res.connection.host);
//     } catch (err) {
//         console.log("************* DATABASE IS NOT CONNECTED **********", err);
//     }
//   }

// export default dbconnection
  