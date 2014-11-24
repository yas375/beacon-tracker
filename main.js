var noble = require('noble');

var RawDataStorage = require('./raw_data_storage.js');
var DataAnalyzer = require('./data_analyzer.js');

var dataStorage = new RawDataStorage();
var dataAnalyzer = new DataAnalyzer(dataStorage);


var known_minors = [ // TODO: move to data analyzer
 '0019', '003a', '002f', '0017',
 '0016', '003b', '002e', '0014',
 '0013', '003c', '002d', '0011',
 '0010', '003d', '002c', '000e',
 '000d', '003e', '002b', '0023',
 '000a', '003f', '002a', '0008',
 '0007', '0003', '0029', '0005',
         '0040', '0004' ];

var analyzeTimer;
if (!analyzeTimer){
  timer = setInterval( function(){
    dataAnalyzer.process();
  }, 1500);
}

var readTimer;
if (!readTimer) {
  timer = setInterval( function() {
    // TODO: send data to a server. Make sure that the data is sent in appropriate order
    console.log(dataAnalyzer.track);
    // TODO: Cleanup `dataAnalyzer.track`
  }, 5000);
}

noble.on('stateChange', function(state) {
  console.log('state: ' + state);
  if (state === 'poweredOn') {
    console.log('start scanning');
    noble.startScanning([], true);
  } else {
    console.log('Status changed to' + state + '; stop scanning');
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
  if (!peripheral.advertisement || !peripheral.advertisement.manufacturerData) {
    return;
  }

  var data = peripheral.advertisement.manufacturerData.toString('hex');
  var preambula = data.substr(0,8);
  var major = data.substr(40,4);
  var minor = data.substr(44,4);
  // var txPowerHex = data.substr(48,2);
  // if (txPowerHex) {
  //   txPower = parseInt(eval('0x' + txPowerHex), 10);
  // }

  // console.log(txPower);

  if (preambula != '4c000215' || known_minors.indexOf(minor) < 0 ) {
    // TODO: filter by ServiceID and major (optional)
    return;
  }

  rssi = peripheral.rssi;

  dataStorage.addData(minor, rssi);
});
