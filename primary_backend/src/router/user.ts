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
      name: parsedData.data.name,
      Solana: 10,
      INR: 5000
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

router.get("/logged_user", authMiddleware, async (req: any, res: any) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        Solana: true,
        INR: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ user });

  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export const userRouter = router;
