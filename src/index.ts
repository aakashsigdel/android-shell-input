import { Command, flags } from '@oclif/command'

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

  async run() {
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
