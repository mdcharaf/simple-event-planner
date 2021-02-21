# Simple Event Planner

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)


SEP is a simple event planner application that is meant for promoters to be able to promote events and users to book tickets for those events

The project is split into two parts:
1. Frontend - Angular web application built with Ionic Framework (#TODO)
2. Backend RESTful API - Node-Express application

### Prerequisite
1. The depends on the Node Package Manager (NPM). You will need to download and install Node from [https://nodejs.com/en/download](https://nodejs.org/en/download/). This will allow you to be able to run `npm` commands.
2. Environment variables will need to be set. These environment variables include database connection details that should not be hard-coded into the application code.

#### Environment Script
Environment script is excluded from this repo to prevent passwords leaks. Please contact admin and ask for it

### Getting Started
* To download all the package dependencies, run the command from the directory `api/events-api`:
    ```bash
    npm install .
    ```
* To download all the package dependencies, run the command from the directory `api/promoters-api`:
    ```bash
    npm install .
    ```
* To run each service locally, run:
    ```bash
    npm run dev
    ```
* To build and run on production , run:
    ```bash
    npm run prod
    ```
### Events API Service
* **Description**: Microservice for promoters to crud events
* **endpoints**:
  * GET - http(s)://{apiHost}/api/v0/event
  * POST - http(s)://{apiHost}/api/v0/event
  * PATCH - http(s)://{apiHost}/api/v0/event/{eventId}
  * DELETE - http(s)://{apiHost}/api/v0/event/{eventId}
  

### Promoters API Service
* **Description**: Microservice to auth promoters
* **endpoints**:
  * POST - http(s)://{apiHost}/api/v0/register
  * POST - http(s)://{apiHost}/api/v0/login