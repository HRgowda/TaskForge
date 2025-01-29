"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { ZapCell } from "@/components/create_zap/ZapCell";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/create_zap/Select-Modal";

function useAvailableActionsAndTriggers() {
  const [availableActions, setAvailableActions] = useState([]);
  const [availableTriggers, setAvailableTriggers] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/trigger/available`)
      .then(x => setAvailableTriggers(x.data.availableTriggers));

    axios.get(`${BACKEND_URL}/api/v1/action/available`)
      .then(x => setAvailableActions(x.data.availableActions));
  }, []);

  return {
    availableActions,
    availableTriggers,
  };
}

export default function Page() {
  const router = useRouter();
  const { availableActions, availableTriggers } = useAvailableActionsAndTriggers();
  const [selectedTrigger, setSelectedTrigger] = useState<{ id: string; name: string; image?: string } | undefined>();
  const [selectedActions, setSelectedActions] = useState<Array<{ index: number; availableActionId: string; availableActionName: string; metadata: any; image?: string }>>([]);
  const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(null);

  const handlePublish = async () => {
    if (!selectedTrigger?.id) return;

    const response = await axios.post(
      `${BACKEND_URL}/api/v1/zap`,
      {
        availableTriggerId: selectedTrigger.id,
        triggerMetadata: {},
        actions: selectedActions.map((a) => ({
          availableActionId: a.availableActionId,
          actionMetadata: a.metadata,
        })),
      },
      {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      }
    );

    router.push("/home");
  };

  const addNewAction = () => {
    setSelectedActions((a) => [
      ...a,
      {
        index: a.length + 2,
        availableActionId: "",
        availableActionName: "",
        metadata: {},
        image: "",
      },
    ]);
  };

  return (
    <div>
      <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center">
        <div className="flex justify-center w-full">
          <ZapCell
            onClick={() => setSelectedModalIndex(1)}
            name={selectedTrigger?.name || "Trigger"}
            index={1}
            image={selectedTrigger?.image}
            isSelected={!!selectedTrigger}
          />
        </div>
        <div className="w-full pt-2 pb-2">
          {selectedActions.map((action, index) => (
            <div className="pt-2 flex justify-center" key={index}>
              <ZapCell
                onClick={() => setSelectedModalIndex(action.index)}
                name={action.availableActionName || "Action"}
                index={action.index}
                image={action?.image}
                isSelected={!!action}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-8">
          <Button onClick={addNewAction}>
            <div>Add Action</div>
          </Button>
          <Button onClick={handlePublish}>
            Publish
          </Button>
        </div>
      </div>
      {selectedModalIndex !== null && (
        <Modal
          availableItems={selectedModalIndex === 1 ? availableTriggers : availableActions}
          onSelect={(props: null | { name: string; id: string; metadata: any; image?: string}) => {
            if (props === null) {
              setSelectedModalIndex(null);
              return;
            }
            if (selectedModalIndex === 1) {
              setSelectedTrigger({
                id: props.id,
                name: props.name,
                image: props.image,
              });
            } else {
              setSelectedActions((a) => {
                const newActions = [...a];
                newActions[selectedModalIndex - 2] = {
                  index: selectedModalIndex,
                  availableActionId: props.id,
                  availableActionName: props.name,
                  metadata: props.metadata,
                  image: props.image,
                };
                return newActions;
              });
            }
            setSelectedModalIndex(null);
          }}
          index={selectedModalIndex}
        />
      )}
    </div>
  );
}
