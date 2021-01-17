import { Command, flags } from '@oclif/command'
import * as readline from 'readline'
import { exec } from 'child_process'

import { keysMap } from './constants'

class AndroidShellInput extends Command {
  static description = ''

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    config: flags.string({
      char: 'c',
      description: 'path to the config file',
      default: './config',
    }),
  }

  listen() {
    readline.emitKeypressEvents(process.stdin)
    process.stdin?.setRawMode?.(true)

    process.stdin.on('keypress', (_, key: readline.Key) => {
      let keySequence: string = ''
      if (key.shift || key.ctrl) {
        keySequence = key.sequence ?? ''
      } else {
        keySequence = key.name ?? ''
      }

      if (keySequence === '\u0003') {
        process.exit()
      }

      this.dispatch(keySequence)
    })
  }

  dispatch(keySequence: string) {
    if (keySequence in keysMap) {
      exec(`adb shell input keyevent ${keysMap[keySequence]}`)
    } else {
      exec(`adb shell input text ${keySequence}`)
    }
  }

  async run() {
    this.listen()
    // const { args, flags } = this.parse(AndroidShellInput)
    //
    // const name = flags.name ?? 'world'
    // this.log(`hello ${name} from ./src/index.ts`)
    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`)
    // }
  }
}

export = AndroidShellInput
