function RawDataStorage() {
  console.log('RawDataStorage initialized')

  this._storage = {}
}

RawDataStorage.prototype.addData = function (minorStr, rssi) {
  if (this._storage[minorStr]) {
    this._storage[minorStr].push(rssi);
  }
  else {
    this._storage[minorStr] = [rssi]
  }
};

RawDataStorage.prototype.getData = function () {
  return this._storage;
};

RawDataStorage.prototype.clear = function () {
  this._storage = {};
};

module.exports = RawDataStorage;