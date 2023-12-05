import { useState, useEffect } from "react";
import { type IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { useChannel } from "../components/Context";
import { useNavigate } from "react-router-dom";
import {
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useJoin,
    useRemoteAudioTracks,
    useRemoteUsers,
} from "agora-rtc-react";

type useStartCallProps = {
    client: IAgoraRTCClient;
    appID: string | undefined;
    channelName: string | undefined;
    token: string | undefined;
};

function useStartCall({
    client,
    channelName,
    appID,
    token,
}: useStartCallProps) {
    const { setChannelLeft } = useChannel();

    const navigate = useNavigate();

    const callStats = client.getRTCStats();

    const Duration = callStats.Duration;

    const [callDuration, setCallDuration] = useState(Duration);

    const { isLoading: isLoadingMic, localMicrophoneTrack } =
        useLocalMicrophoneTrack();

    const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
    const remoteUsers = useRemoteUsers();
    const remoteUser = remoteUsers[0];
    const { audioTracks } = useRemoteAudioTracks(remoteUsers);

    usePublish([localMicrophoneTrack, localCameraTrack]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCallDuration((prevDuration) => prevDuration + 1);
        }, 1000);
        audioTracks.map((track) => track.play());
        return () => {
            clearInterval(timer);
        };
    }, [audioTracks, client]);

    useJoin({
        appid: appID || "",
        channel: channelName || "",
        token: token || null,
    });

    const leaveChannel = () => {
        localCameraTrack?.stop();
        localMicrophoneTrack?.stop();
        client.leave();
        client.unpublish();

        setChannelLeft(true);

        navigate("/");
    };

    const deviceLoading = isLoadingMic || isLoadingCam;

    return {
        callDuration,
        deviceLoading,
        leaveChannel,
        localCameraTrack,
        remoteUsers,
        remoteUser,
    };
}

export default useStartCall;
