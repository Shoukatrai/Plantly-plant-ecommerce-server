import mongoose from "mongoose";

const catSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plant",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", catSchema);

export default Category;
