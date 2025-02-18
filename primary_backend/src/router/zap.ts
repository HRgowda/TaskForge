import { Router } from "express";
import { authMiddleware } from "../middleware";
import { ZapCreateSchema } from "../types";
import { prismaClient } from "../db";

const router = Router();

router.post("/", authMiddleware, async (req: any, res: any) => {
    try {

        const id: string = req.user?.id;
        const body = req.body;

        // Validate request body
        const parsedData = ZapCreateSchema.safeParse(body);
        if (!parsedData.success) {
            return res.status(411).json({ message: "Incorrect inputs" });
        }

        // Ensure user ID is a valid number
        const userId = parseInt(id);
        if (isNaN(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // Start transaction
        const zapId = await prismaClient.$transaction(async (tx) => {
            // Create Zap entry with a temporary triggerId
            const zap = await tx.zap.create({
                data: {
                    userId: userId,
                    triggerId: "pending", // Temporary string value
                    actions: {
                        create: parsedData.data.actions.map((x: any, index: any) => ({
                            actionId: x.availableActionId,
                            sortingOrder: index,
                            metadata: x.actionMetadata
                        })),
                    },
                },
            });

            // Create Trigger entry
            const trigger = await tx.trigger.create({
                data: {
                    triggerId: parsedData.data.availableTriggerId,
                    zapId: zap.id,
                },
            });

            // Update Zap with the actual triggerId
            await tx.zap.update({
                where: { id: zap.id },
                data: { triggerId: trigger.id },
            });

            return zap.id;
        }, { timeout: 30000});

        return res.json({ zapId });

    } catch (error) {
        console.error("Error creating zap:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


router.get("/", authMiddleware, async (req: any, res: any) => {
    const userid = req.user.id;
    const zaps = await prismaClient.zap.findMany({
        where: {
            userId: userid
        },
        include: {
            actions: {
               include: {
                    type: true
               }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });
    return res.json({
        zaps
    })
})

router.get("/:zapId", authMiddleware, async (req: any, res: any) => {
    //@ts-ignore
    const id = req.id;
    const zapId = req.params.zapId;
    
    const zap = await prismaClient.zap.findFirst({
        where: {
            id: zapId,
            userId: id
        },
        include: {
            actions: {
               include: {
                    type: true
               }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });

    return res.json({
        zap
    })

})

export const zapRouter = router;