"use client";

import { HOOKS_URL } from "@/app/config";
import { Button } from "@/components/ui/button";
import { ArrowRight, Copy } from "lucide-react";
import { useState } from "react";
import { zap } from "@/app/(dashboard)/home/page";

export function ZapTable({ zaps }: { zaps: zap[] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyWebhookUrl = async (id: string, url: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-900">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 text-center">
        <h2 className="text-xl font-semibold text-gray-900">Your Automations</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage and monitor your automation workflows
        </p>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-gray-50 text-sm font-bold text-gray-600 text-center border-b border-t border-black/70">
        <div>Workflow</div>
        <div>ID</div>
        <div>Created</div>
        <div>Webhook URL</div>
        <div>Actions</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-300">
        {zaps.map((zap) => (
          <div
            key={zap.id}
            className="grid grid-cols-5 gap-4 px-6 py-4 items-center hover:bg-gray-50/50 transition-colors group text-center"
          >
            {/* Workflow Column */}
            <div className="flex flex-col items-center">
              
              <div className="w-10 h-10 rounded-xl bg-white shadow-md p-2 flex items-center justify-center">
                <img
                  src={zap.trigger.type.image}
                  alt={zap.trigger.type.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Action Icons */}
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {zap.actions
                  .sort((a, b) => a.sortingOrder - b.sortingOrder)
                  .map((action, index) => (
                    <div
                      key={action.actionId}
                      className="w-10 h-10 rounded-lg bg-white shadow-md p-1.5 flex items-center justify-center"
                      // style={{
                      //   marginTop: index >= 2 ? "8px" : "0px", // Move to new row if 3rd image
                      // }}
                    >
                      <img
                        src={action.type.image}
                        alt={action.type.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
              </div>
            </div>

            {/* ID Column */}
            <div className="text-sm font-mono text-gray-600">{zap.id}</div>

            {/* Created At Column */}
            <div className="text-sm text-gray-600">Nov 13, 2025</div>

            {/* Webhook URL Column */}
            <div className="relative flex items-center justify-center group/webhook">
              <div className="max-w-[200px] truncate text-sm text-gray-600 font-mono px-2">
                {`${HOOKS_URL}/api/v1/zap/${zap.id}`}
              </div>
              <button
                onClick={() => copyWebhookUrl(zap.id, `${HOOKS_URL}/api/v1/zap/${zap.id}`)}
                className="ml-3 opacity-0 group-hover/webhook:opacity-100 transition-opacity"
              >
                {copiedId === zap.id ? (
                  <span className="text-green-600 text-xs font-medium">Copied!</span>
                ) : (
                  <Copy className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>

            {/* Actions Column */}
            <div className="flex items-center justify-center gap-2">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-md hover:shadow-lg transition-all duration-300 group/button">
                View Details
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover/button:translate-x-0.5 transition-transform" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
