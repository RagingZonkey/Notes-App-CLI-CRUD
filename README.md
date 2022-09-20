## Description
Notes app is a micro-app that provides functionality for creating, removing, updating and searching for notes as well as listing all the notes that were saved in a JSON file.

It gives you a variety of custom functionality that is applied to `node` command via <span style="color:red">yargs</span> package which includes:

* `add`, `remove`, `read`, `list`, `update` commands - for basic CRUD operations.
* demanded optional argument `--title` applicable to most of the commands, optional arguments of `--scheduledtime`, `--changetime` and `--changetitle` specific to `add` and `update` commands respectively.

## Installation

Set up dependencies on your local machine:
```bash
npm install
```

## Usage

Create a new note having a title only:
```bash
node app.js add --title="Example title"
```

Create a new note having a title and a time value:
```bash
node app.js add --title="Example title" --scheduledtime="11:00"
```

Remove a note:
```bash
node app.js remove --title="Example title"
```

Display a note by a title:
```bash
node app.js read --title="Example title"
```

List all notes:
```bash
node app.js list 
```

Update note's title and scheduled time:
```bash
node app.js update --title="Example title" --changetitle="New title" --changetime="11:11"
```

Update note's title only:
```bash
node app.js update --title="Example title" --changetitle="New title" 
```