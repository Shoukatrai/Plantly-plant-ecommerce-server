import { Prisma } from "../app.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { plantId, quantity } = req.body;

    // 1. Check if the user already has a cart
    let cart = await Prisma.cart.findFirst({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      // 2. Create a cart for this user if it doesn't exist
      cart = await Prisma.cart.create({
        data: {
          user: { connect: { id: userId } },
        },
        include: { items: true },
      });
    }

    // 3. Check if the plant is already in the cart
    const existingItem = await Prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        plantId,
      },
    });

    let updatedItem;
    if (existingItem) {
      // 4. If exists → update quantity
      updatedItem = await Prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      // 5. If not exists → create new cart item
      updatedItem = await Prisma.cartItem.create({
        data: {
          cart: { connect: { id: cart.id } },
          plant: { connect: { id: plantId } },
          quantity,
        },
      });
    }

    // 6. Return updated cart with items
    const updatedCart = await Prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: { plant: true }, // get plant details too
        },
      },
    });

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
