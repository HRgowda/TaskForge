import express from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
const app = express();

app.use(express.json());

app.post("/hooks/catch/:userId/:zapId", async (req: any, res: any) => {
  try {
    const { userId, zapId } = req.params;
    const requestedBody = req.body;

    let actualBody: { amount: string; email: string; };
    
    // Check if 'comment.body' exists and contains the string data
    if (requestedBody?.comment?.body) {
      try {
        // Extract 'amount' and 'email' using regex
        const bodyString = requestedBody.comment.body;

        const amountMatch = bodyString.match(/amount:\s*"([^"]+)"/);
        const emailMatch = bodyString.match(/email:\s*"([^"]+)"/);

        // Format the extracted data
        actualBody = {
          amount: amountMatch ? amountMatch[1] : null,
          email: emailMatch ? emailMatch[1] : null,
        };
      } catch (jsonError: any) {
        console.error("Error parsing body string:", jsonError);
        return res.status(400).json({ error: "Invalid body format" });
      }
    } else {
      return res.status(400).json({ error: "No comment body found" });
    }

    // Log for debugging
    console.log("Webhook received!");
    // console.log("Actual body", actualBody);

    // Store in DB a new trigger
    try {
      await client.$transaction(async (tx: any) => {
        const run = await tx.zapRun.create({
          data: {
            zapId: zapId,
            metadata: {
              comment: actualBody,
            },
          },
        });

        await tx.zapRunOutbox.create({
          data: {
            zapRunId: run.id,
          },
        });
      }, {timeout: 30000});
    } catch (dbError: any) {
      console.error("Database transaction error:", dbError);
      return res.status(500).json({ error: "Database transaction failed" });
    }

    res.json({
      message: "Webhook Received",
    });

  } catch (error: any) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3002, () => {
  console.log("Server running on port 3002");
});
