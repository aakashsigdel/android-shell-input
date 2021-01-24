import { Key } from 'readline'

export interface KeyConfig {
  [key: string]: string
}

export enum Platform {
  AMAZONFIRE = 'amazonfire',
  DEFAULT = 'default',
}

export function getAvailablePlatforms(): Platform[] {
  return Object.values(Platform)
}
export function getAvailablePlatformsString(): string {
  return getAvailablePlatforms()
    .filter((p) => p !== 'default')
    .join(', ')
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

export function requireConfig(platform: Platform): KeyConfig {
  const defaultConfig: KeyConfig = require(`./platformConfigs/${Platform.DEFAULT}`)

  if (!(platform in Platform)) {
    defaultConfig
  }

  return {
    ...defaultConfig,
    ...require(`./platformConfigs/${platform}`),
  } as KeyConfig
}
