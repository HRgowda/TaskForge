"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { ZapCell } from "@/components/create_zap/ZapCell";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/create_zap/Select-Modal";
import { BoltIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { LightbulbIcon } from "lucide-react";
import { RocketIcon, PlusCircleIcon  } from "lucide-react";

function useAvailableActionsAndTriggers() {
  const [availableActions, setAvailableActions] = useState([]);
  const [availableTriggers, setAvailableTriggers] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/trigger/available`)
      .then((x) => setAvailableTriggers(x.data.availableTriggers));

    axios.get(`${BACKEND_URL}/api/v1/action/available`)
      .then((x) => setAvailableActions(x.data.availableActions));
  }, []);

  return { availableActions, availableTriggers };
}

export default function Page() {
  const router = useRouter();
  const { availableActions, availableTriggers } = useAvailableActionsAndTriggers();
  const [selectedTrigger, setSelectedTrigger] = useState<{ id: string; name: string; image?: string } | undefined>();
  const [selectedActions, setSelectedActions] = useState<Array<{ index: number; availableActionId: string; availableActionName: string; metadata: any; image?: string }>>([]);
  const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(null);

  const handlePublish = async () => {
    if (!selectedTrigger?.id) return;

    await axios.post(
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
        headers: { Authorization: localStorage.getItem("token") || "" },
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
    <div className="min-h-screen flex bg-[#121212]">

      {/* Left Grid (Fixed - 40%) */}
      <div className="w-2/5 p-8 text-white flex flex-col sticky top-0 h-screen overflow-hidden bg-[#121212]">
        <h2 className="text-4xl font-extrabold text-gradient mt-6">Welcome to the Zap Creator</h2>
        <p className="text-lg text-gray-400 mt-10">
          Build powerful automation workflows with ease! Set Triggers that initiate actions and customize your automation logic to save time and boost productivity.
        </p>
        <div className="flex flex-col space-y-12 mt-16">
          <div className="flex items-center space-x-3">
            <LightbulbIcon className="h-7 w-7 text-yellow-400" />
            <span className="text-xl font-semibold text-gray-300">Instant Automation</span>
          </div>
          <div className="flex items-center space-x-3">
            <Cog6ToothIcon className="h-7 w-7 text-green-400" />
            <span className="text-xl font-semibold text-gray-300">Customizable Actions</span>
          </div>
          <div className="flex items-center space-x-3">
            <BoltIcon className="h-7 w-7 text-blue-400" />
            <span className="text-xl font-semibold text-gray-300">Start Automating Today</span>
          </div>
        </div>
        <p className="text-md text-gray-400 mt-16">
          Create your own automated workflow, trigger events, and add actions to create an efficient, personalized experience. Let’s get started!
        </p>
      </div>

      {/* Right Grid (Scrollable - 60%) */}
      <div className="w-3/5 p-8 overflow-y-auto h-screen">

        {/* Header */}
        <div className="text-center mb-8 mt-6">
          <h1 className="text-3xl font-semibold text-gray-200">Create Your Zap</h1>
          <p className="text-xl text-gray-400 mt-2">Select a Trigger and Actions to start your automation</p>
        </div>

        {/* Trigger Section */}
        <div className="flex justify-center mb-6">
          <ZapCell
            onClick={() => setSelectedModalIndex(1)}
            name={selectedTrigger?.name || "Trigger"}
            index={1}
            image={selectedTrigger?.image}
            isSelected={!!selectedTrigger}
          />
        </div>

        {/* Actions Section */}
        <div className="space-y-4">
          {selectedActions.map((action, index) => (
            <div className="flex justify-center" key={index}>
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

        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-6">
          <Button onClick={addNewAction} className="px-6 py-2 border-b border-white rounded-lg text-white flex items-center justify-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-500 hover:border-blue-500 transition-all transform hover:scale-105 duration-300 ease-in-out shadow-lg">
            <PlusCircleIcon className="h-5 w-5 mr-2 text-white" />
            Add Action
          </Button>

          <Button onClick={handlePublish} className="px-6 py-2 border-b border-white rounded-lg text-white flex items-center justify-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-pink-500 hover:border-pink-500 transition-all transform hover:scale-105 duration-300 ease-in-out shadow-lg">
            <RocketIcon className="h-5 w-5 mr-2 text-white" />
            Publish
          </Button>
        </div>
      </div>

      {/* Modal */}
      {selectedModalIndex !== null && (
        <Modal
          availableItems={selectedModalIndex === 1 ? availableTriggers : availableActions}
          onSelect={(props: null | { name: string; id: string; metadata: any; image?: string }) => {
            if (props === null) {
              setSelectedModalIndex(null);
              return;
            }
            if (selectedModalIndex === 1) {
              setSelectedTrigger({ id: props.id, name: props.name, image: props.image });
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
