import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    likes: {
        type: Array,
        required: true,
    },
    comments: {
        type: Array,
        required: true,
    },
});

const Posts = mongoose.model("Post", PostSchema);

export default Posts;