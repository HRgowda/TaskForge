import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../Input";

// Action Selectors to submit the metadata respectively

export function EmailSelector({ setMetadata }: { setMetadata: (params: any) => void }) {
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  return (
    <div className="text-white space-y-6 p-6 bg-[#1c1c1c] rounded-lg ">
      <div>
        <Input label="To" placeholder="Enter recipient's email" onChange={(e: any) => setEmail(e.target.value)} />
      </div>
      <div>
        <Input label="Body" type="text" placeholder="Enter email body" onChange={(e: any) => setBody(e.target.value)} />
      </div>
      <div className="pt-4">
        <Button onClick={() => { setMetadata({email, body}) }}className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300" >
          Submit
        </Button>
      </div>
    </div>
  );
}

export function SolanaSelector({ setMetadata }: { setMetadata: (params: any) => void }) {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div className="text-white space-y-6 p-6 bg-[#1c1c1c] rounded-lg">
      <div>
        <Input label="To" type="text" placeholder="Enter email" onChange={(e: any) => setAddress(e.target.value)} />
      </div>
      <div>
        <Input label="Solana" type="text" placeholder="Enter the number SOL USDC" onChange={(e: any) => setAmount(e.target.value)} />
      </div>
      <div className="pt-4">
        <Button onClick={() => { setMetadata({amount, address}) }}className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300" >
          Submit
        </Button>
      </div>
    </div>
  );
}

export function InrSelector ({ setMetadata }: { setMetadata: (params: any) => void }) {

  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("")
  
  return <div className="text-white space-y-6 p-6 rounded-lg bg-[#1c1c1c] shadow-md">
    <div>
      <Input label="To" placeholder="Enter address" type="text" onChange={(e: any) => setAddress(e.target.value)}></Input>
    </div>
    <div>
      <Input label="Amount" placeholder="Enter the amount" type="text" onChange={(e: any) => setAmount(e.target.value)}></Input>
    </div>
    <div className="pt-4">
      <Button onClick={() => {
        setMetadata({ address, amount})
      }}className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">Proceed
      </Button>
    </div>
    
  </div>
}