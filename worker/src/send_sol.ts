import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function sendSol(from: string, solana: string, to: string) {
  
  try{

    const fromUser = await prisma.user.findFirst({
      where: {
        email: from
      }
    })
  
    const toUser = await prisma.user.findFirst({
      where: {
        email: to
      }
    })
  
    if(!toUser || !fromUser){
      return {
        success: false,
        message: `User ${toUser?.name} not found`
      }
    }
  
    if(fromUser.Solana < parseFloat(solana)){
      return {
        success: false,
        message: "Insufficient Solana balance."
      }
    }
  
    await prisma.$transaction([
      prisma.user.update({
        where: {
          email: to
        },
        data: {
          Solana: {
            increment: parseInt(solana)
          }
        }
      }),
      
      prisma.user.update({
        where: {
          email: from
        },
        data: {
          Solana: {
            decrement: parseInt(solana)
          }
        }
      })
    ])
    
    return {
      success: true,
      message: `Solana sent successfully to ${toUser.name}`
    }

  } catch (error: any) {
      console.log("Error in sendsol function", error);
      throw new Error("Transaction failed: "+error.message);
  } 
    finally {
      await prisma.$disconnect();
  }  
}
