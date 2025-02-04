import { Router, Request, Response } from "express";
import express from "express"
import { authMiddleware } from "../middleware";
import { PrismaClient } from "@prisma/client";
import { SigninSchema, SignupSchema } from "../types";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
import { prismaClient } from "../db";

const router = Router();
const prisma = new PrismaClient()

router.use(express.json())

router.post("/signup", async (req: any, res: any) => {
  
  const body = req.body
  const parsedData = SignupSchema.safeParse(body);

  if(!parsedData.success) {
    return res.status(411).json({
      message: "Incorrect inputs"
    })
  }

  const userExists = await prisma.user.findFirst({
    where: {
      email: parsedData.data.username
    }
  });

  if (userExists) {
    return res.status(403).json({
      message: "User already exits"
    })
  }

  await prisma.user.create({
    data:{
      email: parsedData.data.username,
      password: parsedData.data.password,
      name: parsedData.data.name
    }
  })

  return res.status(200).json({
    message: "Please verify your account by checking your email"
  })

})

router.post("/signin", async(req: any, res: any) => {
  const body = req.body;
  const parsedData = SigninSchema.safeParse(body);

  if(!parsedData.success) {
    return res.status(411).json({
      message: "Incorrect inputs"
    })
  }

  const user = await prisma.user.findFirst({
    where: {
      email: parsedData.data.username,
      password: parsedData.data.password
    }
  });

  if(!user) {
    return res.status(403).json({
      message: "Sorry crdentials are incorrect"
    })
  }

  const token = jwt.sign({
    id: user.id
  }, JWT_PASSWORD)

  return res.status(200).json({
    token: token,
    message: "Logged In successfully!"
  })
})

// interface CustomRequest extends Request {
//   id?: string; // You can make it non-optional if you're sure it will always be there
// }

// router.get("/logged_user", authMiddleware, async (req: Request, res: Response): Promise<void> => {
//   try {
//     // Assuming `authMiddleware` attaches `id` to `req.user`
//     const userId = (req as any).user?.id; 

//     if (!userId) {
//       res.status(401).json({ error: "Unauthorized" });
//       return;
//     }

//     const user = await prismaClient.user.findUnique({
//       where: { id: userId }
//     });

//     if (!user) {
//       res.status(404).json({ error: "User not found" });
//       return;
//     }

//     // Debugging: Log the user object to verify its structure
//     console.log("Fetched User:", user);

//     res.json({ user });
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// router.get("/get_user", authMiddleware, async (req: any, res: any) => {
//   // @ts-ignore
//   const id = req.id

//   const user = await prismaClient.user.findFirst({
//     where:{
//       id
//     }
//   });

//   return res.json({
//     user
//   })
// })

export const userRouter = router;
