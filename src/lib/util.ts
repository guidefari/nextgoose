export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function copyToClipboard(text: string) {
  try {
    navigator.clipboard.writeText(text)
  } catch (error) {
    console.warn('Failed to copy text: ', error)
  }
}

export function formatSeconds(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)

  const hString = h < 10 ? `0${h}:` : `${h}:`
  const mString = m < 10 ? `0${m}:` : `${m}:`
  const sString = s < 10 ? `0${s}` : `${s}`

  return `${h > 0 ? hString : ``}${mString}${sString}`
}
