import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Siriwave from "react-siriwave";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { getAudioPermissions } from "./Util";
import config from "./wakeword/common/config";
import MicAudioProcessor from "./wakeword/common/micAudioProcessor";
import InferenceEngine from "./wakeword/common/inferenceEngine";
import OfflineAudioProcessor from "./wakeword/common/offlineAudioProcessor";
import SpeechResModel from "./wakeword/common/speechResModel";

let micAudioProcessor = new MicAudioProcessor(config);
let model = new SpeechResModel("RES8", config);
let inferenceEngine = new InferenceEngine(config);

const sendMessage = (action: string) => {
  chrome.tabs.query(
    { active: true, currentWindow: true },
    function (activeTabs) {
      if (activeTabs[0].id !== undefined) {
        chrome.tabs.sendMessage(activeTabs[0].id, { action: action });
      }
    }
  );
  window.close();
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

  const interval = useRef<any>(null);
  const { transcript } = useSpeechRecognition({ commands });
  const [audioPermission] = useState(getAudioPermissions());

  const listenForWakeword = () => {
    let offlineProcessor = new OfflineAudioProcessor(
      config,
      micAudioProcessor.getData()
    );
    offlineProcessor.getMFCC().done((mfccData: any) => {
      inferenceEngine.infer(mfccData, model);
      if (inferenceEngine.sequencePresent()) {
        console.log("Sequence detected");
        setWakewordDetected(true);
      }
    });
  };

  useEffect(() => {
    micAudioProcessor
      .getMicPermission()
      .done(() => {
        interval.current = setInterval(
          listenForWakeword,
          config.predictionFrequency * 1000
        );
      })
      .fail(function () {
        console.log("Mic permission not granted");
      });

    if (wakewordDetected) {
      SpeechRecognition.startListening({ continuous: true });
      setTimeout(() => {
        window.close();
      }, 5000);
    }
    return () => {
      clearInterval(interval.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wakewordDetected]);

  if (!audioPermission) {
    return <Text>Microphone access not granted.</Text>;
  }

  return (
    <>
      {wakewordDetected ? (
        <Body>
          <Siriwave
            color={"#3D5AFE"}
            speed={0.15}
            amplitude={0.7}
            cover={true}
          />
          <Text>Say a command...</Text>
          <Text style={{ color: "#757575", fontWeight: 600 }}>
            {transcript}
          </Text>
        </Body>
      ) : (
        <Body>
          <Text>Listening for wakeword...</Text>
        </Body>
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

const Body = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
`;

const Text = styled.div`
  font-weight: 400;
  font-size: 12px;
  padding: 16px 0;
  text-align: center;
`;
