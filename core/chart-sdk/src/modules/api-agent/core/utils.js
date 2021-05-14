import _forEach from 'lodash-es/forEach'
import _isArray from 'lodash-es/isArray'
import _isObject from 'lodash-es/isObject'
import _isDate from 'lodash-es/isDate'

function encode(val) {
  return encodeURIComponent(val)
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
export const buildURL = (url, params, paramsSerializer) => {
  if (!params) {
    return url
  }

  var serializedParams
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
    var parts = []

    _forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return
      }

      if (_isArray(val)) {
        key = key + '[]'
      } else {
        val = [val]
      }

      _forEach(val, function parseValue(v) {
        if (_isDate(v)) {
          v = v.toISOString()
        } else if (_isObject(v)) {
          v = JSON.stringify(v)
        }
        parts.push(encode(key) + '=' + encode(v))
      })
    })

    serializedParams = parts.join('&')
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#')
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}

/**
 * Parse a URL to path, query{String}, remove baseUrl
 *
 * @param {string} url
 * @returns {Object} The formatted url Object contains path, query{String}
 */
export const parseURL = (url = '', baseURL) => {
  if (baseURL) {
    url = url.replace(baseURL, '')
  }
  let [path = '', query = ''] = url.split('?')
  return {
    path,
    query
  }
}
