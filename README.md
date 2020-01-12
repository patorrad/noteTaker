# noteTaker

## Description 

noteTaker is a server-side API that utilizes the Express.js framework. The app can be used to write, save, and delete notes. 

The website includes the following pages:

* Index
* Notes

The Notes page includes functionality to display saved notes and write / delete notes.

## Installation

To run the app locally with Node.js the following are dependencies that need to be installed:

 * Express
 * Path
 * fs
 * util

## Usage

In order to run the app on a local server after installation of needed packages run the command "node server.js" in the main app folder. Point you browser to http://localhost:3000. A specific ID is assigned to each note. The route "/api/notes/:note" allows for deletion of notes thanks to the assigned ID. The app handles these intricacies for the user.

## Tests

No tests at this time.

## Credits

Thank you to Joe Rehfuss (https://github.com/Rufasa85) for his knowledge and patience. 