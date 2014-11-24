# Bluetooth tracker

This is the project we were working on Internet of Things Roadshow hackathon organised by Intel.

It's not finished. Just WIP. It scans forever for iBeacons around and records theirs rssi. Every short time it analyzes recorded data and calculates approximate distances to 3 iBeacons with highest rssi.

## Next steps we were supposed to do

1. calculate approximate position of the tracker (device runnign this software)
2. get data from axelerometer, compas and gyro and use it in Kalman's filter. Actually it's not very clear how to access these sensors from node.js because as if today there is no public libraries available for the sensors we had.
3. Send calculated positions to a server.
4. Write a separate server side app which will read the data we sent and draw the track.

## Project setup

We were developing this in order to run on Intel Edison running Yocto linux. Edison has BLE chip and there is BlueZ library available in Yocto linux as in many other linux. And luckily guys behind [noble](https://github.com/sandeepmistry/noble/) were able to make a bridge between to undocumented BlueZ's C api.

```sh
npm install noble
node main.js
```

If your computer has BLE chip you should be able to run this locally. We were running it on MacBook Pro running OS X Yosemite without any troubles.