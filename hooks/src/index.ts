import express from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
const app = express();

app.use(express.json());

app.post("/hooks/catch/:userId/:zapId", async (req: any, res: any) => {

  try {
    const { userId, zapId } = req.params;
    const requestedBody = req.body;

    let actualBody;
    try {
      actualBody = JSON.parse(requestedBody?.comment?.body);
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonError);
      return res.status(400).json({ error: "Invalid JSON in request body" });
    }

    const amountMatch = actualBody?.amount;
    const emailMatch = actualBody?.email;

    const formattedBody = {
      comment: {
        amount: amountMatch ? amountMatch[1] : null,
        email: emailMatch ? emailMatch[1] : null,
      },
    };

    // Log's for some testing purpose..
    console.log("Webhook received!");
    // console.log(JSON.stringify(requestedBody, null, 2));
    // console.log("Actual body", actualBody);

    // Store in DB a new trigger
    try {
      await client.$transaction(async (tx) => {
        const run = await tx.zapRun.create({
          data: {
            zapId: zapId,
            metadata: formattedBody,
          },
        });

        await tx.zapRunOutbox.create({
          data: {
            zapRunId: run.id,
          },
        });
      });
    } catch (dbError) {
      console.error("Database transaction error:", dbError);
      return res.status(500).json({ error: "Database transaction failed" });
    }

    res.json({
      message: "Webhook Received",
    });

  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3002, () => {
  console.log("Server running on port 3002");
});
