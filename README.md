# Streamer

Video, Torrent, Audio streaming application. It is using MongoDB as primary database, HLS video conversion system for uploaded video. Webtorrent library is used for torrent downloading and streaming. This program uses Socket programming in uploading videos. 

## Features

This is the current implemented features of the application

* Video Streaming
  * HLS Streaming
  * Video File Streaming
* Video Upload
* Torrent Streaming
  * Video Streaming
  * Audio Streming
  * Folders Tree View

## Libraries

This is some main libraries or packages used for this app, Cradits goes to all the developers

#### Backend
* Socket.io
* HLS-Server
* Video-Thumbnail-generator
* Webtorrent
* Async 
* Express

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

### ~~`npm test`~~

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

#### 1. Audio Streaming 

## Issues

Currently facing issues, will be fixed in future

* #### **buf length isn't multiple of compact IP/PORTs (6 bytes)**
This error is occuring while downloading torrent file, the fix is not fixed yet


