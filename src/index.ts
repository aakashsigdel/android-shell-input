import { Command, flags } from '@oclif/command'
import * as readline from 'readline'
import { exec } from 'child_process'
import { existsSync, lstatSync, promises } from 'fs'

import { keysMap } from './constants'
import { processKeySequence, mergeConfigs, KeyConfig } from './utils'

class AndroidShellInput extends Command {
  static description = ''

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    config: flags.string({
      char: 'c',
      description: 'path to the config file',
    }),
  }

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
    const { isFile } = await promises.lstat(configPath)
    if (isFile()) {
      const config = await this.readFile(configPath)
      const finalConfig = mergeConfigs(keysMap, config)
      this.listen(finalConfig)
    } else {
      throw new Error('Invalid config file')
    }
  }

  async run() {
    const { flags } = this.parse(AndroidShellInput)
    if (flags.config) {
      this.processConfig(flags.config)
    } else {
      this.listen(keysMap)
    }
  }
}

export = AndroidShellInput
