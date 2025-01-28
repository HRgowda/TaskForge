import express, { Router } from "express";
import { prismaClient } from "../db";

const router = Router();

router.use(express.json());

router.get('/available', async (req, res) => {
  const availableTriggers = await prismaClient.availableTrigger.findMany({});
  res.json({
    availableTriggers
  })
})

export const triggerRouter = router 