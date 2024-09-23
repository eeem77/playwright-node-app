import proxies from './proxies-lunes.js'
import fs from 'fs'

const generateProxies = () => {
  proxies.forEach(element => {
    const report = `'${element.proxy}',\n`
    fs.appendFileSync('proxies-lunes.txt', report)
    console.log(report)
  })
}

generateProxies()
