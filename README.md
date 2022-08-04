# fabricjs-redux-example

## Short summary

This projects intents to show how to work with fabric.js in react-redux application.

## Build instructions

1. Clone
2. Run `npm install` in project directory
3. Run `npm start` in project directory
4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Explanation

Working with fabric.js is, in most cases, working trough its javascript object - an absrtaction layer around html canvas element. It doesn't fit well into react-redux store/actions paradygm. The right way to work with it would be creating a wrapper or a library fork. But that sounds like a lot of work. In this project we'd try another valid way to use fabric.js and keep everything else in react-redux.

Lets think about server interraction in react-redux. The common way is to use thunks. We pretend that our app  lives in bright functional world without side effects. Instead of performing api call we create a function, that performs api call and give it to thunk middleware. Function that is creating another function is pure. 

Lets do the same trick with fabric.js. We'll hide everything related to it in a dedicated middleware, and communicate with it through redux actions. Every time we need to affect the app, middleware would dispatch an action, that will be properly handled by reducers.

This app is build with create-react-app using redux-typescript template. 

## Project Description

This app is a web drawing tool. On the left there are 3 collapsable panels

 - **Tools**
   Allows to draw lines, rectangles, freeform paths or select and move drawn objects
 - **Options** 
   Allows to select stroke color and size. For rectandle fill color is also available. 
 - **Shapes**
   Displays list of drawn shapes. Each item has small image of a shape on its corresponding place on canvas. Pressing delete icon will remove shape from the canvas. Another way to delete shape is to press "delete" on keyboard when shape is selected

Selecting, moving, rotating and resizing objects is something that fabric.js provides by default

## Exploring code

Start with building an app. 

Take a look at `src/features/[some]Panel` to undersdand the ui

`features/canvas` wraps html canvas and initializes fabric.js

`app/canvasMiddleware` handles communitcation between react-redux app and fabric.js

`app/canvas/*.ts` files contain specific drawing logic 

## Comments welcome
