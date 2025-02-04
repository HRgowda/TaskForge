import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient()

async function main() {

  await prismaClient.user.create({
    data:{
      id: 1,
      name: "John",
      email: "john@gmail.com",
      password: "12345678",
      Solana: 10,
      INR: 5000
    }
  })

  await prismaClient.availableTrigger.create({
    data: {
      id: "webhook",
      name: "Webhook",
      image: "https://th.bing.com/th/id/OIP.2Y0rBmvsTvZ0l7vvmiCHtgHaG5?w=189&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    }
  });

  await prismaClient.availableAction.create({
    data: {
      id: "Email",
      name: "Email",
      image: "https://th.bing.com/th/id/R.229079c8f5240851cece598cf8eee770?rik=JND2PKmC%2fxzB1w&riu=http%3a%2f%2fpngimg.com%2fuploads%2femail%2femail_PNG11.png&ehk=6sNwAjueFilXp3tCehLPbXDGgZgsYZdR7y6dZ3vpSk4%3d&risl=&pid=ImgRaw&r=0"
    }
  });

  await prismaClient.availableAction.create({
    data: {
      id: "Solana",
      name: "Solana",
      image: "https://th.bing.com/th?q=Solana+Coin+PNG&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247"
    }
  })

  await prismaClient.availableAction.create({
    data: {
      id: "Inr",
      name: "INR",
      image: "https://static.vecteezy.com/system/resources/previews/009/793/636/original/india-currency-rupee-icon-symbol-illustration-free-vector.jpg"
    }
  })
}

main()