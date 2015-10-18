# lol-anm-parser
A parser for .anm files from League of Legends.

## Download
lol-anm-parser is installable via:

- [GitHub](https://github.com/Pupix/lol-anm-parser) `git clone https://github.com/Pupix/lol-anm-parser.git`
- [npm](https://www.npmjs.com/): `npm install lol-anm-parser`

## Usage example

```js
var AnmParser = require('lol-anm-parser'),
    anm = new AnmParser();
    
    anm.read('Lamb_Idle.anm', function (err, data) {
        console.log(data);
        //  {
        //      duration: 10.066666666666666
        //      FPS: 30
        //      bones: [
        //          {
        //              hash: 497252,
        //              frames: [
        //                  {
        //                      position: {...}
        //                      quaternion: {...}
        //                      scale: {...}
        //                  }
        //              ]
        //              ...
        //          }
        //          ...
        //      ]
        //  }
    });

```

## Available methods

**N.B:** All methods act as promises if no callback is passed.

### parse(path, cb)

It will roughly parse a .anm file from the given path.

**Parameters**

1. **path {string}** A path to where the file to parse resides.
2. **[cb] {Function}** A callback called with `(error, parsedData)` as arguments.

### read(path, cb)

It will read a .anm file from the given path, creating missing data or removing irrelevant data from the animation file.

**Parameters**

1. **path {string}** A path to where the file to read resides.
2. **[cb] {Function}** A callback called with `(error, readData)` as arguments.

