# Streamer

Video, Torrent, Audio streaming application. This application has features like video uploading and streaming, torrent video and audio downloading and streaming and music streaming. 

## Features

This is the current implemented features of the application

* Video Uploading
* Video Streaming
  * HLS Streaming
  * Video Streaming
* Torrent Streaming
  * Video Streaming
  * Audio Streaming
  * Folder Tree View

## Libraries

This is some main libraries or packages used for this app, Cradits goes to all the developers

#### Backend
* Socket.io
* HLS-Server
* Video-Thumbnail-generator
* Webtorrent
* Async 
* Express
* Fluent-FFMPEG

#### Frontend
* Socket.io-Client
* Axios
* Material UI
* Axios
* React-Audio-Player
* React-Video-Player

## Available Scripts - Backend

Scripts for server:

#### `npm run rock`

To run the server at [localhost:4000](http://localhost:4000) to run the API and view in browser

#### `npm build`

Builds the app for production to the `build` folder.

#### ~~`npm test`~~

Feature not available now, add in future!

## Available Scripts - Frontend

Scripts for client:

#### `npm start`

Runs the app in the development mode.<br />
Open [localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm build`

Builds the app for production to the `build` folder.<br />

#### ~~`npm test`~~

Launches the test runner in the interactive watch mode. Feature not implemented yet

## Upcoming

New features are adding soon,

* #### Audio Streaming 

## Issues

Currently facing issues, will be fixed in future

* #### **buf length isn't multiple of compact IP/PORTs (6 bytes)**
This error is occuring while downloading torrent file, the fix is not fixed yet


