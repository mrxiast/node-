

const fs = require('fs')
const path = require('path')
const url = require('url')
//较大文件写入输出的流模式  简单版本
//它的实现是on事件的监听  有open close 结束有end  中间有输出 data
// const ws = fs.createWriteStream('2.exe', { flags: 'w' })
// const wr = fs.createReadStream('1.exe', { flags: 'r' })
// wr.pipe(ws)


// const fsRead = function (url) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(url, { encoding: 'utf-8', flags: 'r' }, function (err, res) {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(res)
//       }
//     })
//   })
// }

// async function readTxt () {
//   let file1 = await fsRead('hellow1.txt')
//   console.log(file1, '111')
//   let file2 = await fsRead(file1 + '.txt')
//   console.log(file2, '222')
//   let file3 = await fsRead(file2 + '.txt')
//   console.log(file3)
// }

// readTxt()

//path模块
// const arr = ['a', 'b', 'c']

// console.log(path.resolve(...arr)) //获取当前运行的地址目录 拼接数组地址

// console.log(path.join(...arr)) //拼接 数组内的各项成为一个地址
// console.log(__dirname) //获取当前运行的地址的目录
// console.log(__filename) //获取当前运行的地址

//os模块
// const os = require('os')
// console.log(os.cpus())  //cpu
// console.log(os.totalmem()) //内存
// console.log(os.arch())//架构
// console.log(os.freemem()) ////限制内存
// console.log(os.platform())//操作平台

//url模块
// const url = require('url')
// const baseUrl = 'https://www.bilibili.com/video/av88369894?p=9'
// console.log(url.parse(baseUrl)) //获取所有的url

// const sonUrl = './son/001.html'
// console.log(url.resolve(baseUrl, sonUrl))//合并url


// //爬虫模块
let axios = require('axios')
let cheerio = require('cheerio')

const urls = 'http://5nj.com/index.php?m=vod-list-id-1-pg-1-order--by-time-class-0-year-0-letter--area--lang-.html'
let page = 228
console.log(new URL(urls).origin)
function getList (url) {
  axios.get(url).then((res) => {
    let $ = cheerio.load(res.data)
    let movieList = []

    $('.main .qcontainer .back .MPli>a').each((index, item) => {
      console.log('片名：' + $(item).attr('title') + '  地址：' + new URL(urls).origin + $(item).attr('href'))

      fs.writeFileSync('movie.txt', '片名：' + $(item).attr('title') + '  地址：' + new URL(urls).origin + $(item).attr('href') + '\n', { flag: 'a' })
    })
    $('.main .page span').each((index, item) => {
      if ($(item).text().indexOf('/')) {
        let num = $(item).text().indexOf('/') + 1
        console.log($(item).text().slice(num), '000')
        if (page == $(item).text().slice(num)) {
          return
        } else {
          page++
          console.log(page, '001')
          let urls = `http://5nj.com/index.php?m=vod-list-id-1-pg-${page}-order--by-time-class-0-year-0-letter--area--lang-.html`
          // writeTxt(movieList)
          getList(urls)
        }
      }
    })

  })
}

function writeTxt (content) {
  return new Promise((res, rej) => {
    fs.writeFile('movie.txt', content + '\n', { flags: 'a', encoding: 'utf-8' }, function (err) {
      if (err) {
        console.log('写入失败！！')
      } else {
        console.log('写入成功')
      }
    })
  })
}


getList(urls)


//puppeteer 无头浏览器

// let puppeteer = require('puppeteer')
// let options = {
//   defaultViewport: {
//     width: 1920,
//     height: 900
//   },
//   headless: false
// }
//通过page handle元素获取点击搜索等事件
// async function test () {
//   let bonswer = await puppeteer.launch(options)
//   let page = await bonswer.newPage()
//   await page.goto('https://www.dytt8.net/')
//   await page.$$eval('#menu ul li a', (elements) => {
//     elements.forEach((item, index) => {
//       console.log(item.innerHTML)
//     })
//   })
//   let inputEle = await page.$('.searchl input')
//   await inputEle.focus()
//   await page.keyboard.type('小丑')
//   let searchEle = await page.$('.searchr input')
//   await searchEle.click()
// }
// test()

//爬取网站地址


//获取页面总的页码数
// async function test () {
//   let bonswer = await puppeteer.launch(options)

//   //获取页码
//   async function getNum () {
//     let page = await bonswer.newPage()
    // await page.setRequestInterception(true)//开启请求拦截
    // page.on('request', interceptedRequest => {
    //   let urlObj = url.parse(interceptedRequest.url())
    //   //如果是谷歌广告的请求就算了  如果不是就 continue
    //   if (urlObj.hostname == 'googleads.g.doubleclick.net') {
    //     interceptedRequestabort()
    //   } else {
    //     interceptedRequest.continue()
    //   }
    // })
  //   await page.goto('https://www.bookben.net')
  //   await page.$$eval('#wrap #menu .cr-menu li a', (element) => {
  //     element[1].click()
  //   })
  //   await page.waitForSelector('.xiaotian .nylr .page ul:first-child em')
  //   let pageNum = await page.$eval('.xiaotian .nylr .page ul:first-child em ', (element) => {
  //     return parseInt(element.innerHTML.split('/')[1])
  //   })

  //   let itemList = await page.$$eval('.xiaotian .nylr .lblr dl .imgdd a', (elements) => {
  //     let list = []
  //     elements.forEach((item, index) => {
  //       console.log(item.getAttribute('title'), item.getAttribute('href'))
  //       list.push({ 'title': item.getAttribute('title'), "url": item.getAttribute('href') })
  //     })
  //     return list
  //   })

  //   itemList.forEach((item, index) => {
  //     fs.writeFileSync('book,txt', '书名：' + item.title + '  地址：https://www.bookben.net' + item.url + '\n', { flag: 'a' })
  //     setTimeout(function () {
  //       down(item.url)
  //     }, index * 50000)

  //   })

  // }
  // function timesF (times) {
  //   return new Promise((res, rej) => {
  //     setTimeout(function () {
  //       resolve('延迟了' + times)
  //     }, times)
  //   })
  // }

//   async function down (url) {
//     let page = await bonswer.newPage()
//     // await page.setRequestInterception(true)//开启请求拦截

//     page.on('request', interceptedRequest => {
//       let urlObj = url.parse(interceptedRequest.url())
//       //如果是谷歌广告的请求就算了  如果不是就 continue
//       if (urlObj.hostname == 'https://www.bookben.net/down/all') {
//         interceptedRequestabort()
//         // axios.get('')
//       } else {
//         interceptedRequest.continue()
//       }
//     })

//     console.log('https://www.bookben.net' + url)
//     await page.goto('https://www.bookben.net' + url)
//     page.$eval('.xiaotian .left .yxjs .xzdd .xz2ul:nth-child(2) a', (element) => {
//       console.log('https://www.bookben.net' + element.getAttribute('href'))
//       element.click()
//       // page
//     })
//   }

//   pageAll = await getNum()

// }





// async function getContent () {
//   let bonswer = await puppeteer.launch(options)
//   let page = await bonswer.newPage()
//   await page.goto('https://www.cmz37.com/shipin/list-%e7%9f%ad%e8%a7%86%e9%a2%91-1.html')
//   let itemUrl = await page.$$eval('', (element) => {

//   })
// }

// test()