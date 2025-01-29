import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../Input";

// Action Selectors to submit the metadata respectively

export function EmailSelector({ setMetadata }: { setMetadata: (params: any) => void }) {
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div>
        <Input label="To" placeholder="Enter recipient's email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <Input label="Body" type="text" placeholder="Enter email body" onChange={(e) => setBody(e.target.value)} />
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
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div>
        <Input label="To" type="text" placeholder="Enter address" onChange={(e) => setAddress(e.target.value)} />
      </div>
      <div>
        <Input label="Amount" type="text" placeholder="Enter amount" onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div className="pt-4">
        <Button onClick={() => { setMetadata({amount, address}) }}className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300" >
          Submit
        </Button>
      </div>
    </div>
  );
}
