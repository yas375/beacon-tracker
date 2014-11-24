// Takes row data and returns calculated data to show
function DataAnalyzer(storage) {
  console.log('DataAnalyzer initialized')
  this.storage = storage;

  // [[x,y], [x,y]]
  this.track = [];
}

DataAnalyzer.prototype.process = function () {
  var data = this.storage.getData();
  this.storage.clear();

  var _this = this;
  this.processData(data, function (x, y) {
    if (x != null && y != null) {
      _this.track.push([x, y]);
    };
  });
};

DataAnalyzer.prototype.processData = function (data, callback) {
  this.filterData(data, function(filteredData) {
    if (filteredData.length < 3) {
      callback(null, null)
      return;
    }

    distances = []
    for (i = 0; i < 3; i++) {
      var oneBeacon = filteredData[i]; // { minor: '0019', rssi: -73}
      txPower = -54;
      ratio = oneBeacon.rssi / txPower;
      var distance;

      if (ratio < 1.0) {
        distance = Math.pow(ratio, 10);
      }
      else {
        distance = 0.89976 * Math.pow(ratio, 7.7095) + 0.111;
      }

      distances.push(distance)
      console.log(oneBeacon.minor + ' ' + distance)
    }

    x = y = 3
    callback(x,y)
  });
};

// data:
// { '0019': [ -73, -82, -80, -83 ],
//   '003f': [ -77 ],
//   '003c': [ -64, -66, -70, -70, -71 ] }
DataAnalyzer.prototype.filterData = function (data, callback) {
  var filteredData = []; // { '0019': -73, '003f': -77 }
  for (minor in data) {
    rssiArray = data[minor]
    var rssiSum = 0;
    for (i in rssiArray) {
      rssiSum += rssiArray[i]
    }
    averageRssi = rssiSum / rssiArray.length

    filteredData.push({minor: minor, rssi: averageRssi})
  }

  filteredData.sort(function(a, b) {
    return b.rssi - a.rssi;
  });

  callback(filteredData);
};

module.exports = DataAnalyzer;
