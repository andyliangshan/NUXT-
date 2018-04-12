import cryptoer from '../utils/encry/cryptoer'
import { aesKeys } from '../config'

export const fetchDeviceId = (req) => {
  let deviceId = req.session.deviceId
  if (!deviceId) {
    const deviceIdCookieStr = req.cookies['jwt-did']
    try {
      deviceId = cryptoer.aesDecrypt256(deviceIdCookieStr, aesKeys)
    } catch (err) {
      deviceId = null
    }
    if (!deviceId) {
      deviceId = cryptoer.random(8)
    }
    req.session.deviceId = deviceId
  }
  return deviceId
}
