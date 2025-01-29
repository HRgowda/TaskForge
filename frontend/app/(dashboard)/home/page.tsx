"use client";

import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "../../config";
import { useEffect, useState } from "react";
import axios from "axios";
import { HOOKS_URL } from "../../config";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

interface zap {
  id: string;
  triggerId: string;
  userId: number;
  actions: {
    id: string;
    zapId: string;
    actionId: string;
    sortingOrder: number;
    type: {
      image: string | undefined;
      id: string;
      name: string;
    };
  }[];
  trigger: {
    id: string;
    zapId: string;
    triggerId: string;
    type: {
      id: string;
      name: string;
      image: string;
    };
  };
}

function useZaps() {
  const [loading, setLoading] = useState(true);
  const [zaps, setZaps] = useState<zap[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/zap`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setZaps(res.data.zaps);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    zaps,
  };
}

export default function DashboardPage() {
  const { loading, zaps } = useZaps();
  const router = useRouter();

  return (
    <div className="ml-32 min-h-screen bg-gray-50">
      <div className="mt-16 flex justify-center pt-8">
        <div className="max-w-screen-lg w-full">
          <div className="flex justify-between pr-8">
            <div className="text-2xl flex flex-col font-semibold">My Zaps</div>
            <Button
              className="bg-purple-800 text-lg px-8 py-2 hover:bg-purple-700"
              onClick={() => {
                router.push("/zap/create");
              }}
            >
              + Create
            </Button>
          </div>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex justify-center">
          <ZapTable zaps={zaps} />
        </div>
      )}
    </div>
  );
}

function ZapTable({ zaps }: { zaps: zap[] }) {
  return (
    <div className="p-8 max-w-screen-lg w-full bg-white rounded-lg shadow-md">
      <div className="flex border-b border-gray-300 font-semibold text-gray-800 py-4">
        <div className="flex-1 text-center">Name</div>
        <div className="flex-1 text-center">ID</div>
        <div className="flex-1 text-center">Created At</div>
        <div className="flex-1 text-center">Webhook URL</div>
        <div className="flex-1 text-center">Action</div>
      </div>

      {zaps.map((zap) => (
        <div
          className="flex border-b border-gray-200 py-4 items-center rounded-lg bg-gray-50 hover:bg-gray-100 mb-4 transition-all"
          key={zap.id}
        >
          <div className="flex-1 text-center">
            {/* Display trigger name first, then action names in vertical layout */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-gray-700 font-medium">
                <img
                  src={zap.trigger.type.image}
                  alt={zap.trigger.type.name}
                  className="w-12 h-12 rounded-full shadow-md"
                />
              </span>
              <div className="flex flex-col gap-2">
                {zap.actions
                  .sort((a, b) => a.sortingOrder - b.sortingOrder)
                  .map((action) => (
                    <span key={action.actionId} className="text-gray-800">
                      <img
                        src={action.type.image}
                        alt={action.type.name}
                        className="w-8 h-8 rounded-full shadow-md"
                      />
                    </span>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex-1 text-center text-sm text-gray-600">{zap.id}</div>
          <div className="flex-1 text-center text-sm text-gray-600">Nov 13, 2025</div>
          <div
            className="flex-1 text-center text-sm text-gray-600 break-words"
            style={{ wordBreak: "break-word" }}
          >
            {`${HOOKS_URL}/api/v1/zap/${zap.id}`}
          </div>
          <div className="text-center flex-1">
            <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
              Go
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

