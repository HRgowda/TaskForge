import express from "express"
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const app = express();

app.use(express.json());

// password logic
app.post("/hooks/catch/:userId/:zapId", async (req, res)=> {
  const {userId, zapId} = req.params;
  const body = req.body;

  // store in db a new trigger
  await client.$transaction(async tx => {
    const run = await tx.zapRun.create({
      data:{
        zapId: zapId,
        metadata: body
      }
    })

    await tx.zapRunOutbox.create({
      data: {
        zapRunId: run.id
      }
    });

  });

  res.json({
    message: "Webhook Recieved"
  })

})

app.listen(3000, () => {
  console.log("Serve running on port 3000")
});