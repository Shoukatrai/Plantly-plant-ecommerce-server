// import { Prisma } from "../app.js";

// export const createProduct = async (req, res) => {
//   try {
//     const {
//       name,
//       slug,
//       discount,
//       rating,
//       description,
//       price,
//       imageUrl,
//       categoryId,
//       stock,
//     } = req.body;
//     console.log(req.body);
//     const product = await Prisma.plant.create({
//       data: {
//         name,
//         slug,
//         discount,
//         rating,
//         description,
//         price,
//         imageUrl,
//         stock,
//         category: { connect: { id: categoryId } },
//       },
//     });
//     res.status(201).json(product);
//   } catch (error) {
//     res.status(500).json({ error: error.message }); //"Failed to create Product"
//   }
// };

// export const editProduct = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const product = await Prisma.plant.update({
//       where: { id: id },
//       data: req.body,
//     });
//     res.status(201).json(product);
//   } catch (error) {
//     res.status(500).json({ error: error.message }); // "Failed to Update product"
//   }
// };

// export const deleteProduct = async (req, res) => {
//   try {
//     const id = req.params.id;
//     await Prisma.plant.delete({
//       where: { id: id },
//     });
//     res.status(201).json("Product Deleted Successfully");
//   } catch (error) {
//     res.status(500).json({ error: "Failed to Update product" });
//   }
// };

// export const getSingleProduct = async (req, res) => {
//   try {
//     console.log("getSingleProduct");
//     const id = req.params.id;
//     const product = await Prisma.plant.findUnique({
//       where: { id: id },
//     });
//     res.status(201).json(product, "Single Product Fetched Successfully");
//   } catch (error) {
//     res.status(500).json({ error: error.message }); //"Failed to fetch product"
//   }
// };

// export const getProducts = async (req, res) => {
//   try {
//     console.log("ALL ProductS");
//     const products = await Prisma.plant.findMany();
//     res.status(201).json(products);
//   } catch (error) {
//     res.status(500).json({ error: error.message }); //"Failed to fetch products"
//   }
// };
