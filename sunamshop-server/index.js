const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// /Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());

// middleware
const verifyJWT = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "Unauthorized" });

  const token = auth.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = decoded;
    next();
  });
};
const verifyAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
};
// protected test route
app.get("/api/user", verifyJWT, async (req, res) => {
  res.json({ message: "You are logged in", user: req.user });
});

console.log(process.env.DB_USER);
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ijgk1ny.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log("MongoDB Connected");
    const usersCollection = client.db("Sunam_Shop").collection("users");
    const cartCollection = client.db("Sunam_Shop").collection("cart");
    const productsCollection = client.db("Sunam_Shop").collection("products");
    const divisionsCollection = client.db("Sunam_Shop").collection("divisions");
    const districtsCollection = client.db("Sunam_Shop").collection("districts");
    const upazilasCollection = client.db("Sunam_Shop").collection("upazilas");
    const ordersCollection = client.db("Sunam_Shop").collection("order");
    const categoryCollection = client.db("Sunam_Shop").collection("category");
    const reviewsCollection = client.db("Sunam_Shop").collection("reviews");
    const flashCampaignCollection = client
      .db("Sunam_Shop")
      .collection("flashSalesCampaign");
    // All Products
    app.get("/api/products", async (req, res) => {
      try {
        const items = await productsCollection
          .find()
          .sort({ createdAt: -1 })
          .toArray();

        res.json(items);
      } catch (err) {
        res.status(500).json({ message: "Server error" });
      }
    });
    app.get("/api/products/:slug", async (req, res) => {
      try {
        const { slug } = req.params;

        const product = await productsCollection.findOne({
          slug: { $regex: `^${slug}$`, $options: "i" },
        });

        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
      } catch (err) {
        console.error("Slug fetch error:", err);
        res.status(500).json({ message: "Server error" });
      }
    });
    // Post Products
    app.post("/api/products", verifyJWT, verifyAdmin, async (req, res) => {
      const body = req.body;
      console.log(body);
      await productsCollection.insertOne(body);
      res.status(201).json({ message: "Products Added successfully" });
    });

    //
    app.get("/api/categories", async (req, res) => {
      try {
        const items = await categoryCollection
          .find()
          .sort({ createdAt: -1 })
          .toArray();

        res.json(items);
      } catch (err) {
        res.status(500).json({ message: "Server error" });
      }
    });
    // REGISTER
    app.post("/api/auth/register", async (req, res) => {
      try {
        const { firstName, email, password } = req.body;

        const exist = await usersCollection.findOne({ email });
        if (exist) {
          return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await usersCollection.insertOne({
          firstName,
          email,
          password: hashedPassword,
          role: "user",
          createdAt: new Date(),
        });

        res.status(201).json({ message: "User registered successfully" });
      } catch (err) {
        res.status(500).json({ message: "Server error" });
      }
    });

    app.post("/api/auth/login", async (req, res) => {
      try {
        const { email, password } = req.body;

        const user = await usersCollection.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: "No user found" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return res.status(401).json({ message: "Wrong password" });
        }

        const token = jwt.sign(
          { id: user._id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "7d" },
        );

        res.json({
          token,
          user: {
            _id: user._id,
            firstName: user.firstName,
            email: user.email,
            role: user.role,
          },
        });
      } catch (err) {
        res.status(500).json({ message: "Server error" });
      }
    });
    app.post("/api/auth/google", async (req, res) => {
      try {
        const { name, email, image } = req.body;

        let user = await usersCollection.findOne({ email });

        if (!user) {
          const result = await usersCollection.insertOne({
            firstName: name,
            email,
            image,
            role: "user",
            provider: "google",
            createdAt: new Date(),
          });

          user = {
            _id: result.insertedId,
            firstName: name,
            email,
            role: "user",
            image,
          };
        }

        // 🔥 generate same JWT like normal login
        const token = jwt.sign(
          { id: user._id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "7d" },
        );

        res.json({
          token,
          user: {
            _id: user._id,
            firstName: user.firstName,
            email: user.email,
            role: user.role,
            image: user.image,
          },
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Google auth failed" });
      }
    });
    // GET ALL USERS (protected)
    app.get("/api/users", verifyJWT, async (req, res) => {
      const users = await usersCollection
        .find({})
        .project({ password: 0 })
        .toArray();
      res.json(users);
    });
    // all users
    app.get("/api/get_all_users", async (req, res) => {
      try {
        const users = await usersCollection
          .find({}, { projection: { email: 1, password: 1, _id: 0 } })
          .toArray();

        res.json(users);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch users" });
      }
    });
    app.put("/api/edit_user_profile", verifyJWT, async (req, res) => {
      try {
        const emailFromToken = req.user.email; // JWT থেকে email

        const {
          firstName,
          lastName,
          email,
          number,
          division,
          district,
          upazila,
          villageName,
        } = req.body;

        // 🔒 Security check (token email vs body email)
        if (emailFromToken !== email) {
          return res.status(403).json({ message: "Unauthorized" });
        }

        const updateDoc = {
          $set: {
            firstName: firstName || "",
            lastName: lastName || "",
            number: number || "",
            division: division || "",
            district: district || "",
            upazila: upazila || "",
            villageName: villageName || "",
            updatedAt: new Date(),
          },
        };

        const result = await usersCollection.updateOne(
          { email: emailFromToken },
          updateDoc,
        );

        if (result.modifiedCount === 0) {
          return res.status(400).json({ message: "No changes made" });
        }

        // updated user return (password ছাড়া)
        const updatedUser = await usersCollection.findOne(
          { email: emailFromToken },
          { projection: { password: 0 } },
        );

        res.json({
          message: "Profile updated successfully",
          updatedUser,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    });

    app.post("/api/cart", verifyJWT, async (req, res) => {
      try {
        const { color, size, qty, email, productId, price } = req.body;

        if (!email) {
          return res.status(400).json({ message: "Email required" });
        }

        if (email !== req.user.email) {
          return res.status(403).json({ message: "Invalid user" });
        }

        // 🔥 same item check
        const existingItem = await cartCollection.findOne({
          productId,
          userEmail: email,
          color: color || null,
          size: size || null,
        });

        if (existingItem) {
          // ✅ quantity update
          const updatedQty = existingItem.qty + (qty || 1);

          await cartCollection.updateOne(
            { _id: existingItem._id },
            { $set: { qty: updatedQty } },
          );

          return res.status(200).json({
            message: "Cart quantity updated",
          });
        }

        // ❌ new item create
        const cartItem = {
          productId,
          userEmail: email,
          color: color || null,
          size: size || null,
          qty: qty || 1,
          price: price || 0,
          createdAt: new Date(),
        };

        const result = await cartCollection.insertOne(cartItem);

        res.status(201).json({
          message: "Cart created",
          insertedId: result.insertedId,
        });
      } catch (err) {
        res.status(500).json({ message: "Server error" });
      }
    });
    // GET MY CART
    app.get("/api/cart", verifyJWT, async (req, res) => {
      try {
        const email = req.user.email;

        const items = await cartCollection
          .find({ userEmail: email })
          .sort({ createdAt: -1 })
          .toArray();

        res.json(items);
      } catch (err) {
        res.status(500).json({ message: "Server error" });
      }
    });

    // Delete Cart Item
    app.delete("/api/cart/:id", verifyJWT, async (req, res) => {
      try {
        const { id } = req.params;
        const email = req.user.email;

        const item = await cartCollection.findOne({
          _id: new ObjectId(id),
        });
        console.log(id);
        console.log(email);
        console.log(item);
        if (!item) {
          return res.status(404).json({ message: "Cart item not found." });
        }

        if (item.userEmail.toLowerCase() !== email) {
          return res.status(403).json({ message: "Unauthorized action." });
        }

        await cartCollection.deleteOne({
          _id: new ObjectId(id),
        });

        res.json({ message: "Cart item deleted successfully." });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete cart item." });
      }
    });
    // Divisions
    app.get("/api/divisions", async (req, res) => {
      try {
        const items = await divisionsCollection
          .find()
          .sort({ createdAt: -1 })
          .toArray();

        res.json(items);
      } catch (err) {
        res.status(500).json({ message: "Server error" });
      }
    });

    // District
    app.get("/api/districts", async (req, res) => {
      try {
        const items = await districtsCollection
          .find()
          .sort({ createdAt: -1 })
          .toArray();

        res.json(items);
      } catch (err) {
        res.status(500).json({ message: "Server error" });
      }
    });

    // upazilas
    app.get("/api/upazilas", async (req, res) => {
      try {
        const items = await upazilasCollection
          .find()
          .sort({ createdAt: -1 })
          .toArray();

        res.json(items);
      } catch (err) {
        res.status(500).json({ message: "Server error" });
      }
    });
    function getMonthShortName() {
      const months = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ];
      return months[new Date().getMonth()];
    }

    async function generateOrderId(ordersCollection) {
      const month = getMonthShortName();

      // last inserted order বের করো
      const lastOrder = await ordersCollection
        .find({})
        .sort({ createdAt: -1 }) // latest order
        .limit(1)
        .toArray();

      let nextSerial = 1;

      if (lastOrder.length > 0 && lastOrder[0].orderId) {
        const lastSerial = parseInt(lastOrder[0].orderId.split("-")[3]);
        nextSerial = lastSerial + 1;
      }

      const formattedSerial = String(nextSerial).padStart(2, "0");

      return `ORD-SL-${month}-${formattedSerial}`;
    }
    // checkout
    app.post("/api/orders", verifyJWT, async (req, res) => {
      const { email, deliveryCharge, shippingAddress, paymentMethod } =
        req.body;
      console.log(email);
      // 1️⃣ শুধু ওই user এর cart নাও
      const cartItems = await cartCollection
        .find({ userEmail: email })
        .toArray();

      if (!cartItems.length) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      // 2️⃣ subtotal calculate করো
      let subtotal = 0;
      const formattedItems = [];

      for (const item of cartItems) {
        const itemSubtotal = item.price * item.qty;
        subtotal += itemSubtotal;

        formattedItems.push({
          productId: item.productId,
          name: item.name, // যদি cart এ থাকে
          price: item.price,
          qty: item.qty,
          size: item.size,
          color: item.color,
          subtotal: itemSubtotal,
        });
      }

      const total = subtotal + Number(deliveryCharge);
      const orderId = await generateOrderId(ordersCollection);
      // 3️⃣ নতুন order তৈরি করো
      const order = {
        orderId,
        userEmail: email,
        items: formattedItems,
        subtotal,
        deliveryCharge: Number(deliveryCharge),
        total,
        paymentMethod: "COD",
        status: "pending",
        createdAt: new Date(),
      };

      await ordersCollection.insertOne(order);

      // 4️⃣ cart clear করো
      await cartCollection.deleteMany({ userEmail: email });

      res.json({
        message: "Order placed successfully",
      });
    });

    // GET MY CART
    app.get("/api/orders", verifyJWT, async (req, res) => {
      try {
        const email = req.user.email;

        const items = await ordersCollection
          .find({ userEmail: email })
          .sort({ createdAt: -1 })
          .toArray();

        res.json(items);
      } catch (err) {
        res.status(500).json({ message: "Server error" });
      }
    });

    // GET Monthly Top Selling Products
    app.get("/api/get_monthly_sales", async (req, res) => {
      try {
        const now = new Date();

        const startOfMonth = new Date(
          Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1),
        );

        const endOfMonth = new Date(
          Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1),
        );

        const result = await ordersCollection
          .aggregate([
            {
              $match: {
                createdAt: { $gte: startOfMonth, $lt: endOfMonth },
                status: { $in: ["pending", "delivered"] },
              },
            },

            { $unwind: "$items" },

            // Convert productId string → ObjectId
            {
              $addFields: {
                productObjectId: { $toObjectId: "$items.productId" },
              },
            },

            {
              $group: {
                _id: "$productObjectId",
                totalQty: { $sum: { $toInt: "$items.qty" } },
              },
            },

            // 🔥 Join Products
            {
              $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "product",
              },
            },

            { $unwind: "$product" },

            // 🔥 Join Reviews
            {
              $lookup: {
                from: "reviews",
                let: { productIdString: { $toString: "$_id" } },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$productId", "$$productIdString"],
                      },
                    },
                  },
                ],
                as: "reviews",
              },
            },

            { $sort: { totalQty: -1 } },

            // ✅ FINAL CLEAN STRUCTURE
            {
              $project: {
                _id: 0,
                productId: { $toString: "$_id" },
                totalQty: 1,

                // Product Info (Direct usable)
                _id: "$product._id",
                name: "$product.name",
                description: "$product.description",
                price: "$product.price",
                discountPrice: "$product.discountPrice",
                slug: "$product.slug",
                images: "$product.images",
                sizes: "$product.sizes",
                color: "$product.color",
                isFlash: "$product.isFlash",
                flashPrice: "$product.flashPrice",
                stock: "$product.stock",
                sold: "$product.sold",
                reviews: 1,
              },
            },
          ])
          .toArray();

        res.json(result);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
      }
    });
    // GET  All Orders
    app.get("/api/manage_orders", async (req, res) => {
      try {
        const items = await ordersCollection
          .find()
          .sort({ createdAt: -1 })
          .toArray();

        res.json(items);
      } catch (err) {
        res.status(500).json({ message: "Server error" });
      }
    });
    // Order Update
    app.put(
      "/api/updated_order/:id",
      verifyJWT,
      verifyAdmin,
      async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        try {
          const order = await ordersCollection.findOne({
            _id: new ObjectId(id),
          });

          if (!order) {
            return res.status(404).send({ message: "Order not found" });
          }

          const previousStatus = order.status;

          if (previousStatus === status) {
            return res.send({ message: "Already updated" });
          }

          const updateData = { status };
          const unsetData = {};

          const today = new Date();
          const year = today.getFullYear().toString().slice(-2);
          const month = String(today.getMonth() + 1).padStart(2, "0");
          const day = String(today.getDate()).padStart(2, "0");
          const formattedDate = `${year}-${month}-${day}`;

          // 🔥 DELIVERY
          if (status === "delivered") {
            for (const item of order.items) {
              await productsCollection.updateOne(
                { _id: new ObjectId(item.productId) },
                {
                  $inc: {
                    stock: -Number(item.qty),
                    sold: Number(item.qty),
                  },
                },
              );
            }

            updateData.deliveryDate = formattedDate;
          }

          // 🔥 CANCEL
          if (status === "cancelled") {
            if (previousStatus === "delivered") {
              for (const item of order.items) {
                await productsCollection.updateOne(
                  { _id: new ObjectId(item.productId) },
                  {
                    $inc: {
                      stock: Number(item.qty),
                      sold: -Number(item.qty),
                    },
                  },
                );
              }
            }

            updateData.cancelDate = formattedDate;
            unsetData.deliveryDate = "";
            unsetData.rejectDate = "";
          }

          // 🔥 REJECT
          if (status === "rejected") {
            updateData.rejectDate = formattedDate;
            unsetData.deliveryDate = "";
            unsetData.cancelDate = "";
          }

          // 🔥 BACK TO PENDING
          if (status === "pending") {
            unsetData.deliveryDate = "";
            unsetData.cancelDate = "";
            unsetData.rejectDate = "";
          }

          await ordersCollection.updateOne(
            { _id: new ObjectId(id) },
            {
              $set: updateData,
              $unset: unsetData,
            },
          );

          res.send({ message: "Order updated successfully" });
        } catch (error) {
          console.error(error);
          res.status(500).send({ error: "Failed to update order" });
        }
      },
    );
    // CreateFlash Campaign
    app.post(
      "/api/create-flash-campaign",
      verifyJWT,
      verifyAdmin,
      async (req, res) => {
        try {
          const campaignData = {
            ...req.body,

            // 🔥 এখানে convert করতে হবে
            startDate: new Date(req.body.startDate),
            endDate: new Date(req.body.endDate),

            isActive: true,
          };

          await flashCampaignCollection.insertOne(campaignData);

          res.send({ success: true });
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "Error creating campaign" });
        }
      },
    );

    app.get("/api/flash-sales", async (req, res) => {
      try {
        // 🔥 UTC ব্যবহার করো (simple & correct)
        const now = new Date();

        // 1️⃣ Active campaign বের করো
        const campaign = await flashCampaignCollection.findOne({
          isActive: true,
          startDate: { $lte: now },
          endDate: { $gte: now },
        });

        if (!campaign) {
          return res.json({ campaign: null, products: [] });
        }

        // ✅ এখন campaign আছে — এখন log করা যাবে
        console.log("Campaign UTC:", campaign.startDate);
        console.log(
          "Campaign BD:",
          new Date(campaign.startDate).toLocaleString("en-BD", {
            timeZone: "Asia/Dhaka",
          }),
        );

        // 2️⃣ productIds convert
        const productObjectIds = campaign.productIds.map(
          (id) => new ObjectId(id),
        );

        // 3️⃣ Products বের করো
        const products = await productsCollection
          .find({ _id: { $in: productObjectIds } })
          .toArray();

        // 4️⃣ Flash price calculate
        const updatedProducts = products.map((product) => {
          const originalPrice = Number(product.price);

          let flashPrice = originalPrice;

          if (campaign.discountPercentage) {
            flashPrice =
              originalPrice -
              (originalPrice * campaign.discountPercentage) / 100;
          }

          if (campaign.discountAmount) {
            flashPrice = originalPrice - campaign.discountAmount;
          }

          return {
            ...product,
            flashPrice: Math.max(0, Math.round(flashPrice)),
            isFlash: true,
          };
        });

        res.json({
          campaign,
          products: updatedProducts,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    });

    app.get("/api/get_reviews", async (req, res) => {
      try {
        const reviews = await reviewsCollection
          .find({})
          .sort({ _id: -1 }) // latest first
          .toArray();

        res.send(reviews);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to fetch reviews" });
      }
    });

    await client.db("admin").command({ ping: 1 });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
