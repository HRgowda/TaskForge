import express, { Router } from 'express'
import { prismaClient } from '../db';
import { authMiddleware } from '../middleware';

const router = Router();

router.get("/available", async (req, res) => {

  try {
    const availableActions = await prismaClient.availableAction.findMany({});
    res.json({
      availableActions
    });
  } catch (error) {
    console.log("Error fetching available actions");
    res.status(500).json({
      error: 'Internal server error.'
    })
  }  
})

export const actionRouter = router;