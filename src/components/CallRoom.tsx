import { AgoraRTCProvider } from "agora-rtc-react";
import VideoPlayer from "../components/VideoPlayer";
import useSetupCall from "../lib/useSetupCall";

const appID = import.meta.env.VITE_APP_ID;
const channelName = import.meta.env.VITE_CHANNEL_NAME;
const token = import.meta.env.VITE_APP_TOKEN;

function CallRoom() {
    const { agoraClient, render } = useSetupCall();

    if (!agoraClient || !render) return <div>Loading...</div>;

    return (
        <AgoraRTCProvider client={agoraClient}>
            <VideoPlayer
                channelName={channelName}
                appID={appID}
                token={token}
                client={agoraClient}
            />
        </AgoraRTCProvider>
    );
}

export default CallRoom;
