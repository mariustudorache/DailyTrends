import { connect } from "mongoose";

// const DB_URI = `${process.env.DB_URI}`
const DB_URI = `mongodb://root:pass@localhost/admin`;

const dbInit = async () => {
  try {
    await connect(DB_URI);
  } catch (error) {}
};

export default dbInit;
