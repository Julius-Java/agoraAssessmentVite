"use client";
import { CalendarDaysIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import CallDurationTimer from "./CallDurationTimer";
import { Id } from "react-toastify";

function CallStatsAndConfig({
    callDuration,
    notify,
}: {
    callDuration: number;
    notify: (message: string) => Id;
}) {
    return (
        <div className="flex flex-col gap-y-5 bg-white rounded-lg py-3 px-1 w-max items-center justify-center  absolute left-5 transform top-1/2 -translate-y-1/2 z-10 border border-blue-500">
            <div>
                <div className="bg-blue-600 text-white rounded font-semibold text-xs lg:text-sm w-max p-1">
                    <CallDurationTimer seconds={callDuration} />
                </div>
            </div>
            <button
                className="group"
                onClick={() =>
                    notify("Please Confirm you want to repeat this appointment")
                }
            >
                <CalendarDaysIcon className="w-5 h-5 lg:w-7 lg:h-7 text-blue-600 group-hover:scale-110" />
            </button>

            <button
                className="group"
                onClick={() => notify("Ensure your wearable device is on")}
            >
                <UserCircleIcon className="w-5 h-5 lg:w-7 lg:h-7 text-blue-600 group-hover:scale-110" />
            </button>
        </div>
    );
}

export default CallStatsAndConfig;
