import * as readline from 'readline'
import { promises } from 'fs'
import { exec } from 'child_process'
import { Command, flags } from '@oclif/command'

import {
  processKeySequence,
  mergeConfigs,
  KeyConfig,
  getAvailablePlatforms,
  getAvailablePlatformsString,
  Platform,
  requireConfig,
} from './utils'

class AndroidShellInput extends Command {
  static description = `
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
  "\`": "82",
}
  `

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    config: flags.string({
      char: 'c',
      description: 'path to the config file',
    }),
    platform: flags.string({
      char: 'p',
      description: `load one of the default platform config. Available platforms: ${getAvailablePlatformsString()}`,
      options: getAvailablePlatforms(),
      default: Platform.DEFAULT,
    }),
  }

  platform: Platform = Platform.DEFAULT

  listen(keyConfig: KeyConfig) {
    readline.emitKeypressEvents(process.stdin)
    process.stdin?.setRawMode?.(true)

    process.stdin.on('keypress', (_, key: readline.Key) => {
      let keySequence: string = processKeySequence(key)

      if (keySequence === '\u0003') {
        process.exit()
      }

      this.dispatch(keyConfig, keySequence)
    })
  }

  dispatch(keyConfig: KeyConfig, keySequence: string) {
    if (keySequence in keyConfig) {
      exec(`adb shell input keyevent ${keyConfig[keySequence]}`)
    } else {
      exec(`adb shell input text ${keySequence}`)
    }
  }

  async readFile(path: string): Promise<{ [key: string]: string }> {
    const data = await promises.readFile(path)
    return JSON.parse(data.toString())
  }

  async processConfig(configPath: string) {
    const stat = await promises.lstat(configPath)
    if (stat.isFile()) {
      const config = await this.readFile(configPath)
      const finalConfig = mergeConfigs(requireConfig(this.platform), config)
      this.listen(finalConfig)
    } else {
      throw new Error('Invalid config file')
    }
  }

  async run() {
    const { flags } = this.parse(AndroidShellInput)
    this.platform = flags.platform as Platform
    if (flags.config) {
      this.processConfig(flags.config)
    } else {
      this.listen(requireConfig(this.platform))
    }
  }
}

export = AndroidShellInput
