import { Router, Request, Response } from "express";
import express from "express"
import { authMiddleware } from "../middleware";
import { SigninSchema, SignupSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

const router = Router();
router.use(express.json())

router.post("/signup", async (req: any, res: any) => {
  
  const body = req.body
  const parsedData = SignupSchema.safeParse(body);

  if(!parsedData.success) {
    return res.status(411).json({
      message: "Incorrect inputs"
    })
  }

  const userExists = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username
    }
  });

  if (userExists) {
    return res.status(403).json({
      message: "User already exits"
    })
  }

  await prismaClient.user.create({
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

  const user = await prismaClient.user.findFirst({
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

  res.status(200).json({
    token: token,
    message: "Logged In successfully!"
  })
})

router.get("/logged_user", authMiddleware, async(req: any, res: any) => {
  // fix the type here
  // @ts-ignore
  const id = req.id
  const user = await prismaClient.user.findFirst({
    where: {
      id
    },
    select:{
      name: true,
      email: true
    }
  })

  return res.json({
    user
  })
})

export const userRouter = router;
