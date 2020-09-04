#!/usr/bin/env bash

set -e

keystore=./pulsar-manga.keystore

if ! type "jarsigner" > /dev/null; then
  echo "jarsigner est introuvable"
  exit 1
fi

zalign=$(find ~ -name zipalign -print -quit)

if [ ! "$zalign" ]; then
  echo "zipalign est introuvable"
  exit 1
fi

if [ ! -e $keystore ]; then
  echo "Keystore introuvable ($keystore)"
  exit 1
fi

npm run build:android

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $keystore dist/cordova/android/apk/release/app-release-unsigned.apk pulsar-manga
exec $zalign -v 4 ./dist/cordova/android/apk/release/app-release-unsigned.apk ./dist/cordova/android/apk/release/pulsar-manga.apk
