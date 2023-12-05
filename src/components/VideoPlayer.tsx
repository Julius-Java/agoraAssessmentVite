// VideoPlayer
"use client";
import { LocalVideoTrack, RemoteVideoTrack, RemoteUser } from "agora-rtc-react";
import { type IAgoraRTCClient } from "agora-rtc-sdk-ng";
import CallControls from "../components/CallControls";
import CallStatsAndConfig from "../components/CallStatsAndConfig";
import useStartCall from "../lib/useStartCall";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useRouter } from "next/navigation";

type VideoPlayerProps = {
    channelName: string | undefined;
    appID: string | undefined;
    token: string | undefined;
    client: IAgoraRTCClient;
};

function VideoPlayer({ channelName, appID, token, client }: VideoPlayerProps) {
    // Use Start Call Hook
    const {
        callDuration,
        deviceLoading,
        leaveChannel,
        localCameraTrack,
        remoteUsers,
        remoteUser,
    } = useStartCall({
        client,
        channelName,
        appID,
        token,
    });

    const notify = (message: string) =>
        toast(message, {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
        });

    // const numUsers = remoteUsers.length + 1;

    // remoteUsers.map((user) => {
    //     console.log(user.uid);
    // });

    // console.log(remoteUsers);

    // console.log(numUsers);

    if (deviceLoading || client.connectionState !== "CONNECTED")
        return (
            <div className="text-center text-lg italic font-bold">
                Connecting...
            </div>
        );
    return (
        <div className="h-screen w-full">
            <div className="max-w-4xl my-10 !mb-10 mx-auto max-h-[800px] bg-blue relative rounded border-2 border-red-200">
                {/* End call button  */}
                <div className="absolute z-10 bottom-0 left-0 right-0 flex justify-center pb-4">
                    <div
                        className="px-5 py-3 text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 w-40 cursor-pointer"
                        onClick={() => leaveChannel()}
                    >
                        End Call
                    </div>
                </div>
                <CallControls />
                <CallStatsAndConfig
                    callDuration={callDuration}
                    notify={notify}
                />
                <LocalVideoTrack
                    track={localCameraTrack}
                    play={true}
                    style={{
                        position: "absolute",
                        top: "0.5rem",
                        right: "0.5rem",
                        width: "200px",
                        height: "200px",
                        // borderRadius: "5rem",
                        border: "4px solid blue",
                        zIndex: "100",
                    }}
                />

                {remoteUsers.length === 0 ? (
                    <div className="h-[800px] w-full text-lg flex items-center justify-center font-bold">
                        Waiting...
                    </div>
                ) : (
                    <RemoteVideoTrack
                        key={remoteUser.uid}
                        track={remoteUser.videoTrack}
                        play={true}
                        style={{
                            // position: "static",
                            width: "100%",
                            height: "800px",
                        }}
                    />
                )}
                {remoteUsers.map((user) => (
                    <RemoteUser
                        key={user.uid}
                        user={user}
                        playVideo={true}
                        playAudio={true}
                    />
                ))}
                <ToastContainer />
            </div>
        </div>
    );
}

export default VideoPlayer;
