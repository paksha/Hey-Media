# Hey Media &mdash; CS 489 Computational Audio Project

A Chrome extension prototype that uses a convolutional neural network trained using [Howl](https://github.com/castorini/howl) to detect a wake word phrase and control media playback.

Our write-up for this work can be found in this [Medium post](https://edwinzhng.medium.com/hey-media-a-voice-controlled-chrome-extension-for-media-playback-a089cb2dd971).

#### Overview

The `model/` directory contains the pretrained model and settings used for wake word detection.

The `hey-media/` folder contains a React-based Chrome extension that runs our wake word model using TensorFlow.js and listens for user commands using the Web Speech API built into Chrome. Most of the wake word inference code under `src/wakeword` was taken from [howl-deploy](https://github.com/castorini/howl-deploy).

#### Development Guide

1. Make sure [yarn](https://yarnpkg.com/) and [NodeJS](https://nodejs.org/en/) 14+ are installed locally

2. Navigate to the `hey-media` folder and install dependencies

```
yarn install
```

3. Start the React server

```
yarn start
```

4. Load the extension into Chrome by enabling developer mode and selecting the generated `hey-media/build` folder

5. Build a production JS bundle with `yarn build`
