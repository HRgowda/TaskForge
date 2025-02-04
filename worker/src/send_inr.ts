import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function sendInr(from: string, amount: string, to: string) {

  try{
    const fromUser = await prisma.user.findFirst({
      where: {
        email: from
      }
    });
  
    const toUser = await prisma.user.findFirst({
      where: {
        email: to
      }
    });
  
    if(!fromUser || !toUser) {
      return {
        success: false,
        message: "User not found"
      }
    }

    if (fromUser.INR < parseFloat(amount)) {
      return {
        success: false,
        message: "Insufficient INR balance."
      }
    }
  
    await prisma.$transaction([
      prisma.user.update({
        where: {
          email: from
        }, 
        data: {
          INR: {
            decrement: parseInt(amount)
          }
        }
      }),
  
      prisma.user.update({
        where: {
          email: to
        },
        data: {
          INR: {
            increment: parseInt(amount)
          }
        }
      })
    ])
  
    return {
      success: true,
      message: `INR sent successfully to ${toUser.name}`
    }

  } 
    catch (error: any) {
      console.log("Error in sendsol function", error);
      throw new Error("Transaction failed: "+error.message);
  } 
    finally {
      await prisma.$disconnect();
  }  
}