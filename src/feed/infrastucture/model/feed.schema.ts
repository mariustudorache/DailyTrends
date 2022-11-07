import { Schema, model } from "mongoose";

const FeedSchema = new Schema(
  {
    uuid: {
      type: String,
      unique: true,
    },
    source: {
      type: String,
    },
    news: {
      title: {
        type: String,
      },
      content: {
        type: String,
      },

      link: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const FeedModel = model("Feed", FeedSchema);

export default FeedModel;
