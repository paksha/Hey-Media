import util from "./util";

// in-browser related configs
// units are all in seconds unless specified otherwise
var config = {
  commands: ["hey", "media", "unknown"],
  predictionFrequency: 0.062, // 62 ms
  windowSize: 0.5, // 500 ms
  sampleRate: 16000,
};

var micAudioProcessorConfig = {
  paddingSize: 6000, // in samples
};

config["micAudioProcessorConfig"] = micAudioProcessorConfig;

var featureExtractionConfig = {
  melBands: 40,
  hopSize: config.sampleRate * 0.0125, // hop by 12.5 ms
};

config["featureExtractionConfig"] = featureExtractionConfig;

var zmuvConfig = {
  mean: -2.0045,
  std: 4.0985,
};

config["zmuvConfig"] = zmuvConfig;

var inferenceEngineConfig = {
  inference_window_ms: 2000,
  smoothing_window_ms: 50,
  tolerance_window_ms: 500,
  inference_weights: [5, 12, 0.5],
  inference_sequence: [0, 1],
};

config["inferenceEngineConfig"] = inferenceEngineConfig;

let input_width =
  (config.sampleRate * config.windowSize) / featureExtractionConfig.hopSize + 1;
let input_height = featureExtractionConfig.melBands;

let modelConfig = {
  weight_name: "hey_media",
  input_shape: [input_height, input_width, 1],
  n_layers: 6,
  n_feature_maps: 45,
  res_pool: [4, 3],
  conv_size: [3, 3],
  conv_stride: [1, 1],
  use_dilation: false,
};

config["modelConfig"] = modelConfig;

let melSpectrogramConfig = {
  use_precomputed: true,
  spectrogram: null,
  n_fft: 512,
  win_length: null,
  window: "hann",
  center: true,
  pad_mode: "reflect",
  power: 2.0,
  f_min: 0,
  f_max: 8000,
  htk: true,
  norm: false,
};

config["featureExtractionConfig"] = util.extendObj(
  featureExtractionConfig,
  melSpectrogramConfig
);

export default config;
