/**
 * Created by Wu Jian Ping on - 2017/06/04.
 */

import qs from 'qs'

const options = {
  allowPrototypes: true, // not ignore properties on the object prototype
  encodeValuesOnly: true, // encode
  sort: (a, b) => a.localeCompare(b), // parameter display sequence by A-Z
  allowDots: true, // dot
  // ignoreQueryPrefix: true,
  // delimiter: ';',
  arrayFormat: 'brackets' // { a: ['b', 'c'] }=>'a[]=b&a[]=c'
  // arrayFormat: 'repeat' // { a: ['b', 'c'] } =>'a=b&a=c'
}

const parse = (val) => qs.parse(val, options)

const stringify = (query) => qs.stringify(query, options)

const query = () => {
  if (__BROWSER__) {
    return parse(window.location.search.replace('?', '')) || {}
  }
  return {}
}

export {
  options,
  parse,
  stringify,
  query
}

export default {
  options,
  parse,
  stringify,
  query
}
