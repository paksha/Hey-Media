import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Siriwave from "react-siriwave";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { getAudioPermissions } from "./Util";

const App: React.FunctionComponent = () => {
  const { transcript } = useSpeechRecognition();
  const [audioPermission] = useState(getAudioPermissions());

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
  }, []);

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
          <Text>{transcript}</Text>
        </>
      ) : (
        <Text>Microphone access not granted.</Text>
      )}
      {!SpeechRecognition.browserSupportsSpeechRecognition() && (
        <Text>
          Browser not supported. Please use the latest version of Chrome or
          Edge.
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
