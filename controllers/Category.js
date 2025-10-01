import Category from "../models/Category.js";
import slugify from "slugify";

export const createCategory = async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;

    const isCategory = await Category.findOne({ name });
    if (isCategory) {
      return res.status(400).json({
        status: false,
        data: null,
        message: "Category already exists!",
      });
    }

    const slug = slugify(name, { lower: true, strict: true });

    const category = await Category.create({
      name,
      slug,
      description,
      imageUrl,
    });

    res.status(201).json({
      status: true,
      data: category,
      message: "Category created successfully!",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: error.message,
    });
  }
};

export const editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };
    if (updateData.name) {
      updateData.slug = slugify(updateData.name, { lower: true, strict: true });
    }

    const category = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "Category not found",
      });
    }

    res.status(200).json({
      status: true,
      data: category,
      message: "Category updated successfully!",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    await Prisma.plant.deleteMany({
      where: { categoryId: id },
    });
    await Prisma.category.delete({
      where: { id: id },
    });
    res.status(201).json("Category Deleted Successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSingleCategory = async (req, res) => {
  try {
    console.log("getSingleProduct");
    const id = req.params.id;
    const product = await Prisma.category.findUnique({
      where: { id: id },
      include: { products: true },
    });
    const count = product.products.length;
    console.log(count, "count");
    res.status(201).json(product, "Single Product Fetched Successfully");
  } catch (error) {
    res.status(500).json({ error: error.message }); //"Failed to fetch product"
  }
};

export const getCategories = async (req, res) => {
  try {
    console.log("ALL ProductS");
    const products = await Prisma.category.findMany({
      include: { products: true },
    });
    res.status(201).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
