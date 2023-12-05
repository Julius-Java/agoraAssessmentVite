import { useState, useEffect } from "react";
import { type IAgoraRTCClient } from "agora-rtc-sdk-ng";

function useSetupCall() {
    const [agoraClient, setAgoraClient] = useState<IAgoraRTCClient>();
    const [render, setRender] = useState(false);

    useEffect(() => {
        if (window) {
            const initSdk = async () => {
                const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;
                // const AgoraRTCReact = await import("agora-rtc-react");
                const client = AgoraRTC.createClient({
                    mode: "rtc",
                    codec: "vp8",
                });
                setAgoraClient(client);
                setRender(true);
                // setAgoraProvider(AgoraRTCReact.AgoraRTCProvider);
            };

            initSdk();
        }
    }, []);

    return {
        agoraClient,
        render,
    };
}

export default useSetupCall;
