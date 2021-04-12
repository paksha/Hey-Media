import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Siriwave from "react-siriwave";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { getAudioPermissions } from "./Util";

const sendMessage = (action: string) => {
  chrome.tabs.query(
    { active: true, currentWindow: true },
    function (activeTabs) {
      if (activeTabs[0].id !== undefined) {
        chrome.tabs.sendMessage(activeTabs[0].id, { action: action });
      }
    }
  );
};

const App: React.FunctionComponent = () => {
  const [wakewordDetected, setWakewordDetected] = useState(false);

  const commands = [
    {
      command: ["play"],
      callback: () => sendMessage("play"),
      isFuzzyMatch: true,
    },
    {
      command: ["pause"],
      callback: () => sendMessage("pause"),
      isFuzzyMatch: true,
    },
    {
      command: ["restart"],
      callback: () => sendMessage("restart"),
    },
    {
      command: ["volume up"],
      callback: () => sendMessage("volume_up"),
    },
    {
      command: ["volume down"],
      callback: () => sendMessage("volume_down"),
    },
    {
      command: ["full screen"],
      callback: () => sendMessage("fullscreen"),
      isFuzzyMatch: true,
    },
    {
      command: ["exit full screen"],
      callback: () => sendMessage("exit_fullscreen"),
      isFuzzyMatch: true,
    },
    {
      command: ["forward"],
      callback: () => sendMessage("forward"),
      isFuzzyMatch: true,
    },
    {
      command: ["backward"],
      callback: () => sendMessage("backward"),
      isFuzzyMatch: true,
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });
  const [audioPermission] = useState(getAudioPermissions());

  useEffect(() => {
    if (wakewordDetected) {
      SpeechRecognition.startListening({ continuous: true });
      setTimeout(() => {
        window.close();
      }, 3000);
    }
  }, [wakewordDetected]);

  return (
    <>
      <Header>Hey Media</Header>
      {audioPermission ? (
        <>
          <Siriwave
            color={"#3D5AFE"}
            speed={0.15}
            amplitude={0.7}
            cover={true}
          />
          <Text>Listening for command...</Text>
          <Text style={{ color: "#757575", fontWeight: 600 }}>
            {transcript}
          </Text>
        </>
      ) : (
        <Text>Microphone access not granted.</Text>
      )}
      {!SpeechRecognition.browserSupportsSpeechRecognition() && (
        <Text>
          Browser not supported. Please use the latest version of Chrome.
        </Text>
      )}
    </>
  );
};

export default App;

const Header = styled.div`
  font-weight: 400;
  font-size: 14px;
  padding: 8px;
  text-align: left;
  background: #f2f3f4;
`;

const Text = styled.div`
  font-weight: 400;
  font-size: 12px;
  padding-bottom: 16px;
  text-align: center;
`;
