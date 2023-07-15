import mongoose from "mongoose";

const dbConnection = (): void => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("database connected"))
    .catch((err: Error) => console.log(err));
};

export default dbConnection;
