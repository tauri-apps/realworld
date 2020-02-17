# Tauri x Realworld apps

## Usage

Install dependencies with `yarn`

Fully build and bundle all apps (AKA "download all NPM"; not working properly yet): `node build`

Build and bundle a specific app: `node build {{app.repo}}`*

*take a look at apps.yaml to find all app repos.

Commented apps have not been successfully bundled, either because of the build or the bundle phase failing.
A detail about what's wrong is displayed above the app title. 