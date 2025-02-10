"use client";

import { HOOKS_URL } from "@/app/config";
import { Copy } from "lucide-react";
import { useState } from "react";
import { zap } from "@/app/(dashboard)/home/page";
import { AlertMessage } from "../AlertMessage";

export function ZapTable({ zaps }: { zaps: zap[] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<{ message: string; status: "success" | "failure" } | null>(null);

  const copyWebhookUrl = async (id: string, url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setAlertMessage({ message: "Failed to copy the URL", status: "failure" });
    }
  };
  

  return (
    <div className="bg-[#1E1E1E] rounded-lg mt-2 shadow-md border border-[#292929] hover:shadow-white">
      <div className="p-6 border-b border-[#292929] text-center">
        <h2 className="text-xl font-semibold text-white">Your Automations</h2>
        <p className="text-sm text-gray-400 mt-1">Manage and monitor your automation workflows</p>
      </div>

      <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-[#181818] text-sm font-semibold text-gray-300 text-center border-b border-[#292929]">
        <div>SL No.</div>
        <div>Workflow</div>
        <div>ID</div>
        <div>Created</div>
        <div>Webhook URL</div>
      </div>

      <div className="divide-y divide-[#292929]">
        {zaps.map((zap: any, index: number) => (
          <div
            key={zap.id}
            className="grid grid-cols-5 gap-4 px-6 py-6 items-center hover:bg-[#242424] transition-colors group text-center"
          >
            <div className="text-sm font-mono text-gray-400">{index + 1}</div>
            
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white shadow-md p-2 flex items-center justify-center">
                <img src={zap.trigger.type.image} alt={zap.trigger.type.name} className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {zap.actions
                  .sort((a: any, b: any) => a.sortingOrder - b.sortingOrder)
                  .map((action: any) => (
                    <div
                      key={action.actionId}
                      className="w-10 h-10 rounded-full bg-white shadow-md p-1.5 flex items-center justify-center"
                    >
                      <img src={action.type.image} alt={action.type.name} className="w-full h-full object-contain" loading="lazy" />
                    </div>
                  ))}
              </div>
            </div>

            <div className="text-sm font-mono text-gray-400">{zap.id}</div>

            <div className="text-sm text-gray-400">
              {new Date(zap.Date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hourCycle: "h24",
              })}
            </div>

            <div className="relative flex items-center justify-center group/webhook">
              <div className="max-w-[200px] truncate text-sm text-gray-400 font-mono px-2">
                {`${HOOKS_URL}/hooks/catch/${zap.userId}/${zap.id}`}
              </div>
              <button
                onClick={() => copyWebhookUrl(zap.id, `${HOOKS_URL}/hooks/catch/${zap.userId}/${zap.id}`)}
                className="ml-3 opacity-0 group-hover/webhook:opacity-100 transition-opacity"
              >
                {copiedId === zap.id ? (
                  <span className="text-green-400 text-xs font-medium">Copied!</span>
                ) : (
                  <Copy className="h-4 w-4 text-gray-500 hover:text-gray-300" />
                )}
              </button>
            </div>

            {/* <div className="flex items-center justify-center gap-2">
              <Button
                onClick={() => router.push(`/zap/${zap.id}`)}
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-md hover:shadow-lg transition-all duration-300 group/button"
              >
                View Details
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover/button:translate-x-0.5 transition-transform" />
              </Button>
            </div> */}
          </div>
        ))}
      </div>

      {alertMessage && <AlertMessage message={alertMessage.message} status={alertMessage.status} />}
    </div>
  );
}
