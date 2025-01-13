"use client"

import { AppBar } from "@/components/dashboard/Appbar";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import { HOOKS_URL } from "../config";
import { useRouter } from "next/navigation";

interface zap {
  "id": string,
  "triggerId": string,
  "userId": number,
  "actions": {
          "id": string,
          "zapId": string,
          "actionId": string,
          "sortingOrder": number,
          "type": {
              image: string | undefined;
              "id": string,
              "name": string
          }
      }[],
      "trigger": {
        map(arg0: (x: any) => import("react").JSX.Element): import("react").ReactNode;
        "id": string,
        "zapId": string,
        "triggerId": string,
        "type": {
            "id": string,
            "name": string,
            "image": string
        }
    }
}

function useZaps() {
  const [loading, setLoading] = useState(true)
  const [zaps, setZaps] = useState<zap[]>([])

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/zap`,{
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
      .then(res => {
        setZaps(res.data.zaps)
        setLoading(false)
      })
  }, [])

  return {
    loading, zaps
  }
}

export default function DashboardPage() {

  const {loading, zaps} = useZaps()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      <AppBar />
      <div className="mt-16 flex justify-center pt-8">
        <div className="max-w-screen-lg w-full">
          <div className="flex justify-between pr-8">       
            <div className="text-2xl flex flex-col font-semibold">
              My Zaps
            </div>        
            <Button className="bg-purple-800 text-lg px-8 py-2 hover:bg-purple-700" onClick={() => {
              router.push("/zap/create")
            }}>
              + Create
            </Button>
          </div>     
        </div>
      </div>
      {loading ? "Loading..." : <div className="flex justify-center"> <ZapTable zaps={zaps} /> </div>}

    </div>
  );
}

function ZapTable({ zaps }: { zaps: zap[] }) {
  const router = useRouter();

  return (
    <div className="p-8 max-w-screen-lg w-full">
      <div className="flex border-b border-gray-300 font-semibold text-gray-800 pt-8 pb-2">
        <div className="flex-1 text-center">Name</div>
        <div className="flex-1 text-center">ID</div>
        <div className="flex-1 text-center">Created At</div>
        <div className="flex-1 text-center">Webhook URL</div>
        <div className="flex-1 text-center">Go</div>
      </div>
      {zaps.map((zap) => (
        <div className="flex border-b border-gray-300 py-2 items-center" key={zap.id}>
          <div className="flex-1 text-center">
            <div>
              {zap.actions.map(x => (
                <div>
                  {x.type.name}
                </div>
              ))}
            </div>
            <div>
              {zap.trigger.type.name}
            </div>
          </div>
          <div className="flex-1 text-center text-sm">
            {zap.id}
          </div>
          <div className="text-center flex-1 text-sm">
            Nov 13, 2025
          </div>
          <div
            className="flex-1 text-center break-words"
            style={{ wordBreak: "break-all" }}
          >
            {`${HOOKS_URL}/api/v1/zap/${zap.id}`}
          </div>
          <div className="text-center flex-1">
            <Button className="">
              Go
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
