import path from 'path'
import * as fontkit from 'fontkit'

export interface FontConfig {
  fontDir?: string
  fontFamilyMappings: Record<string, string>
}
const _config: FontConfig = { fontFamilyMappings: {} }
// Keep the headless public API independent of fontkit's browser canvas types.
export interface LoadedFont {
  ascent: number
  descent: number
  unitsPerEm: number
  lineGap: number
  xHeight: number
  capHeight: number
  layout(text: string): { glyphs: { advanceWidth: number }[] }
}
const fonts: Record<string, LoadedFont> = {}

export const setFontDir = function (dir: string) {
  _config.fontDir = dir
  return this
}

export const setFontFamilyMappings = function (map: Record<string, string>) {
  _config.fontFamilyMappings = map
  return this
}

// TODO: make async
export const preloadFonts = () => {
  const map = _config.fontFamilyMappings

  for (const [font, file] of Object.entries(map)) {
    const filename = path.join(_config.fontDir, file)

    try {
      fonts[font] = fontkit.openSync(filename) as fontkit.Font
    } catch (e) {
      console.warn(`Could not load font file for ${font}`, e)
    }
  }
  return this
}

export const getConfig = () => _config
export const getFonts = () => fonts

export const config = {
  setFontDir,
  setFontFamilyMappings,
  preloadFonts,
  getConfig,
  getFonts
}
