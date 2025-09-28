import { Prisma } from "../app.js";

export const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const product = await Prisma.category.create({
      data: req.body,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Category" });
  }
};

export const editProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Prisma.category.update({
      where: { id: id },
      data: req.body,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message }); // "Failed to Update product"
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await Prisma.category.delete({
      where: { id: id },
    });
    res.status(201).json("Product Deleted Successfully");
  } catch (error) {
    res.status(500).json({ error: "Failed to Update product" });
  }
};

export const getSingleProduct = async (req, res) => {
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

export const getProducts = async (req, res) => {
  try {
    console.log("ALL ProductS");
    const products = await Prisma.category.findMany();
    res.status(201).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message }); //"Failed to fetch products"
  }
};
