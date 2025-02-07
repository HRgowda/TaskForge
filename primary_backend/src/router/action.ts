import express, { Router } from 'express'
import { prismaClient } from '../db';
import { authMiddleware } from '../middleware';

const router = Router();

router.get("/available", async (req, res) => {
  const availableActions = await prismaClient.availableAction.findMany({});
  res.json({
    availableActions
  })
})

export const actionRouter = router;