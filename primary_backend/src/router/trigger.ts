import express, { Router, Request, Response } from "express";
import { prismaClient } from "../db";

const router = Router();

router.use(express.json());

router.get('/available', async (req: Request, res: Response): Promise<void>  => {
  try {
    const availableTriggers = await prismaClient.availableTrigger.findMany({});
    res.json({
      availableTriggers
    })
  } catch (error) {
    console.log("Error fetching available trigger", error);
    res.status(500).json({
      error: "Internal server error"
    })
  }  
})

export const triggerRouter = router 