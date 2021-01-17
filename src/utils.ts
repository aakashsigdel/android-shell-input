import { Key } from 'readline'

export function processKeySequence(key: Key): string {
  if (key.shift || key.ctrl || !key.name) {
    return key.sequence ?? ''
  }
  return key.name ?? ''
}
