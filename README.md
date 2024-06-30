# Jacob's Shadow of the Erdtree Item Tracker

This was made because I really didn't like the currently available ones. It's dumb that fextralife and the other wiki have ones that require you to pay, smh.

## About the Project

The project is built using React and Vite. With a lot of data scraped from various sources including an excel doc provided by another reddit user.

The images were scraped from the wiki and may break. The tagging system is mostly manual so there may be inconsistencies.

## Building and Testing

This project uses Node version `v20.9.0`

Download the project and run the command `npm i` to install necessary packages.

To build into a test environment run the command `npm run dev` to build and it will provide a URL to visit in the local browser.

To build run `npm run build` which will create a local /dist folder with the built project.

The two python files in the /data folder are for utility use cases and are being built alongwith the project just to handle all of the data files.
Python is not required and those files shouldn't be touched but can act as guides for alterting aspects of the data files.

## Publishing to GH-PAGES for yourself.

Run `npm i gh-pages --save-dev` to install the needed gh-pages dev package.
Modify the `vite.config.js` file's base to be your repository name preceded by a '/'.
Run `npm run deploy` to build and deploy to the gh-pages branch of your respository.