import { Key } from 'readline'

export interface KeyConfig {
  [key: string]: string
}

export function processKeySequence(key: Key): string {
  if (key.shift || key.ctrl || !key.name) {
    return key.sequence ?? ''
  }
  return key.name ?? ''
}

export function mergeConfigs(
  config1: KeyConfig,
  config2: KeyConfig
): KeyConfig {
  return { ...config1, ...config2 }
}
