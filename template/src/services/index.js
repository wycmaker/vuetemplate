import { infowindow } from '@/services/infowindow'
import { validator } from '@/services/validate'
import { common } from '@/services/commonMethod'
import { encryptHex, decryptHex } from '@/services/crypto'

const crypto = {
  encrypt: encryptHex,
  decrypt: decryptHex
}

export const services = { common, validator, info: infowindow, crypto }