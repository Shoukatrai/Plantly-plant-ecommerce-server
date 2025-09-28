import { Prisma } from "../app.js";

export const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const product = await Prisma.plant.create({
      data: req.body,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
};
