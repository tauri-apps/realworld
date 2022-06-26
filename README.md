# Tauri x Realworld apps

This project is an experiment to demonstrate how easy you can bundle an existing frontend app with Tauri, whichever the framework you're using, without having to change a single line from the codebase.

The main script (build.js) simply consists in a pipeline that will clone, install dependencies, build the application, initialize Tauri then bundle the application. 

## Setup

1. Take a look at the Wiki to setup Tauri: https://github.com/tauri-apps/tauri/wiki
2. Have Git, Node and NPM installed
3. Clone and install this project dependencies, either with NPM or Yarn:
```bash
git clone git@github.com:tauri-apps/realworld.git
cd realworld

yarn install
# OR
npm install
```

## Usage

`node build {{app.repo}}`
This will apply the pipeline on a single application from apps.yaml. Copy/paste a `repo` property from the wanted application and let it build.

`node build`
This will apply the pipeline on _every_ application from apps.yaml. Unless you have some spare time, enough disk space, a nice CPU and unlimited bandwidth, you should avoid to do it (and ensure the pipeline at least works for a single project in a first time).

## Details about apps.yaml

Commented apps have not been successfully bundled (yet), either because of the build or the bundle phase failing.
A detail about what's wrong is displayed above the app title. 
