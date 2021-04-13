let util = {};

util.extendObj = function extendObj(obj1, obj2) {
  for (let key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      obj1[key] = obj2[key];
    }
  }

  return obj1;
};

util.arrPower = function arrPower(arr, power) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.pow(arr[i], power);
  }

  return arr;
};

util.isNumeric = function isNumeric(str) {
  return !isNaN(str);
};

util.isAllZero = function isAllZero(data) {
  return data.every(function (elem) {
    return elem === 0;
  });
};

util.duplicateElements = function duplicateElements(arr, times) {
  let duplicated = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < times; j++) {
      duplicated.push(arr[i]);
    }
  }
  return duplicated;
};

util.shuffleArray = function shuffleArray(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

util.pointwiseBufferMult = function pointwiseBufferMult(a, b) {
  let c = [];

  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    c[i] = a[i] * b[i];
  }

  return c;
};

util.printData = function printData(name, data) {
  if (data.length === 0) {
    console.log("\t", name, " has length of 0");
  } else if (this.isAllZero(data)) {
    console.log(name, data);
    console.log("\t", name, " is all zero array with length ", data.length);
  }
  console.log(name, data);

  if (Array.isArray(data[0])) {
    // 2D array
    let temp = data;
    data = [];

    for (let i = 0; i < temp.length; i++) {
      for (let j = 0; j < temp[i].length; j++) {
        data.push(temp[i][j]);
      }
    }
  }
  const arrMin = (arr) => Math.min(...arr);
  const arrMax = (arr) => Math.max(...arr);
  const arrAvg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  console.log("\trange : ( ", arrMin(data), " ~ ", arrMax(data), " )");
  console.log("\tmean : ", arrAvg(data));

  let i = 0;
  while (data[i] === 0) {
    i++;
  }
  console.log("\tfirst non zero element : ", i, " - ", data[i]);

  i = data.length - 1;
  while (data[i] === 0) {
    i--;
  }
  console.log("\tlast non zero element : ", i, " - ", data[i]);
};

util.roundTo = function roundTo(num, place) {
  return +(Math.round(num + "e+" + place) + "e-" + place);
};

util.numberWithCommas = function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

util.sortNumberArray = function sortNumberArray(arr) {
  util.sort = arr.sort(function (a, b) {
    return a - b;
  });
};

util.percentile = function percentile(arr, p) {
  if (arr.length === 0) return 0;
  if (typeof p !== "number") throw new TypeError("p must be a number");
  if (p <= 0) return arr[0];
  if (p >= 1) return arr[arr.length - 1];

  let index = (arr.length - 1) * p;
  let lower = Math.floor(index);
  let upper = lower + 1;
  let weight = index % 1;

  if (upper >= arr.length) return arr[lower];
  return arr[lower] * (1 - weight) + arr[upper] * weight;
};

util.transpose2d = function transpose2d(arr) {
  let row = arr.length;
  let col = arr[0].length;

  let transposed = [];
  for (let j = 0; j < col; j++) {
    transposed.push([]);
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      transposed[j].push(arr[i][j]);
    }
  }
  return transposed;
};

util.flatten2d = function flatten2d(arr) {
  let row = arr.length;
  let col = arr[0].length;

  let flattened = [];

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      flattened.push(arr[i][j]);
    }
  }
  return flattened;
};

util.transposeFlatten2d = function transposeFlatten2d(arr) {
  let row = arr.length;
  let col = arr[0].length;

  let flattened = [];

  for (let j = 0; j < col; j++) {
    for (let i = 0; i < row; i++) {
      flattened.push(arr[i][j]);
    }
  }
  return flattened;
};

util.calculateAccuracy = function calculateAccuracy(output, target) {
  if (output.length !== target.length) {
    console.error(
      "output(" +
        output.length +
        ") and target(" +
        target.length +
        ") have different size !"
    );
  }
  let correct = 0;
  for (let i = 0; i < output.length; i++) {
    if (output[i] === target[i]) {
      correct += 1;
    }
  }
  return correct / output.length;
};

// Function to download data to a file
util.download = function download(data, filename, type) {
  let file = new Blob([data], { type: type });
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    // Others
    let a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
};

util.isEmpty = function isEmpty(obj) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
};

export default util;
