#!/bin/bash

echo Generate apk Cordova

ng build --aot --target=production --environment=prod --output-path cordova/www/ --base-href .

cd cordova

cordova build android
