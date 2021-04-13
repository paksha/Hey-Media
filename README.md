# CS 489 Computational Audio Project

A Chrome extension prototype that uses a convolutional neural network trained using [Howl](https://github.com/castorini/howl) to detect a wakeword phrase and control media playback.

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
