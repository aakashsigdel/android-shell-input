android-shell-input
===================

Send keyboad input through adb

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/android-shell-input.svg)](https://npmjs.org/package/android-shell-input)
[![Downloads/week](https://img.shields.io/npm/dw/android-shell-input.svg)](https://npmjs.org/package/android-shell-input)
[![License](https://img.shields.io/npm/l/android-shell-input.svg)](https://github.com/aakashsigdel/android-shell-input/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
### Install
```sh-session
$ npm install -g android-shell-input or yarn global add android-shell-input
```
### Usage
```sh-session
$ asi (-v|--version)
0.0.1
$ asi --help [COMMAND]
USAGE
$ asi

OPTIONS
  -c, --config=config  path to the config file
  -h, --help           show CLI help
  -v, --version        show CLI version

DESCRIPTION
  Send keyboad input through adb.
  You can pass in an optional JSON Config file to configure additional keys.

  Format of the JSON config file:
  {
       "keyboard_key": "keycode"
  }

  example config file:
  {
       "h": "21",
       "j": "19",
       "k": "20",
       "l": "22"
  }

  default config:
  {
     "backspace": "4",
     "escape": "4",
     "up": "19",
     "down": "20",
     "left": "21",
     "right": "22",
     "return": "23",
     "`": "82",
  }
...
```
<!-- usagestop -->
# Commands
<!-- commands -->

<!-- commandsstop -->
