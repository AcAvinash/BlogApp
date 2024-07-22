import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post", //reference to the post model
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const likeTable = mongoose.model("Like", likeSchema);
export default likeTable;
