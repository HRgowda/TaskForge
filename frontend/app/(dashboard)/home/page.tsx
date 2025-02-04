"use client";

import { BACKEND_URL } from "../../config";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/app/loading";
import { CreateZap } from "@/components/home/Create_zap";
import { ZapTable } from "@/components/home/zaptable";

export interface zap {
  id: string;
  triggerId: string;
  userId: number;
  Date: Date;
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

  return (
    <div className="ml-32">
      {loading ? (
        <Loading />
      ) : zaps.length === 0 ? (
        <CreateZap />
      ) : (
        <div className="flex justify-center">
          <ZapTable zaps={zaps} />
        </div>
      )}
    </div>
  );
}
