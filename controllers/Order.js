import { Prisma } from "../app.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id
    const {  items } = req.body;
    const order = await Prisma.order.create({
      data: {
        user: { connect: { id: userId } },
        items: {
          create: items.map((item) => ({
            plant: { connect: { id: item.plantId } },
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        user: true,
        items: { include: { plant: true } },
      },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
