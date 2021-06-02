# 结构化解析爬虫数据，写入 json 文件

### 时间：**2020.03.21**

#### 背景

已知获取了一批关于苏大新闻标题的数据，可以在数据库中查找到 url 列表数据，但是对于网页的内容，如何存放呢？

1.精炼化

网页中爬取下来的内容有 head,body,script,style 等标签，很显然，将 script 和 style 标签的内容爬取下来是不符合需求的。同时，也有很多\r\t\n 空格等无语意的字符，需要
过滤掉。我们的目标是，用最少的存储空间，尽可能的存放网页中有用的信息。

2.自动化

利用 scrapy 进行自动化，爬完一个网页爬下一个。。

3.结构化

由于 elasticsearch 只接受 json 格式的文档，所以说爬取下来的文档结构需要为 json 格式。json 格式意味着需要 key 和 value，根据 seo 的经验
，tdk:title-descript-keywords 三字段需要拿出来，alt 代表图片说明信息，bodycontent 代表页面其他内容，url 代表当前页面的链接。实现结构化，方便后期的拓展，比如说对
tdk 的权重的设置，搜索结果 url 的跳转，更细粒度的划分等。

#### 需要工具

- xml 解析工具--有助于过滤掉 style、script 标签
- json 工具，方便 python 中字典到 json 数据格式的转换
- 注：没有用管道，写文件直接放爬虫文件里面写了
- pymysql，python 读取数据库工具

#### 爬虫文件 txt2jsonSpider.py

```

# -*- coding: utf-8 -*-
import scrapy
# 吧文本结构化存储到json文件中
import html as ht
import pymysql
import json
from lxml import html
from mySpider.items import txt2jsonItem
class Txt2jsonSpider(scrapy.Spider):
    name = 'txt2json'
    # allowed_domains = [''http://oese.suda.edu.cn/0f/b4/c14883a331700/page.htm/main.psp'']
    start_urls = ["http://www.suda.edu.cn",]
    url_pool = []# url池
    count=0
    index=0
    # 特殊设置
    custom_settings = {
        # 'ITEM_PIPELINES' :'mySpider.pipelines.txt2jsonPipeline:300
        'DOWNLOAD_DELAY': 2
    }

    def parse(self,response):
        self.url_pool=self.readFromDB()
        yield scrapy.FormRequest(url=self.url_pool[0],callback=self.parse2)
    def parse2(self, response):
        self.index = self.index+1
        item = txt2jsonItem()
        tree = html.fromstring(response.body)
        ele = tree.xpath('//script | //noscript| //style')
        for e in ele:
          e.getparent().remove(e)
        treetxt = tree.xpath('//text()')
        # 将空格制表符替换掉
        for index in range(len(treetxt)):
          treetxt[index]=treetxt[index].strip().replace('\t','').replace('\n','').replace('\r','')
        # 提取有效信息
        title = tree.xpath('//title/text()')
        description = tree.xpath("//meta[@name='description']/@content")
        keywords= tree.xpath("//meta[@name='keywords']/@content")
        imgs = tree.xpath("//img/@alt")
        url = response.request.url.strip('*/')
        # join可以把列表中的元素连接起来
        item['url'] = url
        item['title'] = ''.join(title)
        item['description']=''.join(description)
        item['keywords']=''.join(keywords)
        item['imgs']=''.join(imgs)
        item['body']=''.join(treetxt)
        print(url)
        print(self.index)
        # print('title')
        # print(''.join(title))
        # print('description')
        # print(''.join(description))
        # print('keywords')
        # print(''.join(keywords))
        # print('imgs')
        # print(''.join(imgs))
        # print('treetxt')
        # print(''.join(treetxt))
        content = json.dumps(dict(item), indent=1,ensure_ascii=False)+'\n'
        self.writeFile(self.index,content)

        for target in self.url_pool:
            yield scrapy.FormRequest(url=target,callback=self.parse2)
    # 读取数据库中的url
    def readFromDB(self):
      db = pymysql.connect(
          "localhost", "root", "yk84732225", "spiderurl")
      cursor = db.cursor()
      sql_geturl = "SELECT url from sudanews"
      cursor.execute(sql_geturl)
      info = cursor.fetchall()
      url_pool=[]

      for x in info:
        url_pool.append(x[0])
        # self.count=self.count+1
        # if self.count==100:
        #   break
      return url_pool
    # 写文件
    def writeFile(self,index,content):
      # f = open("../../sudaNewsText"+str(index)+'.txt', 'w', encoding='utf-8')
      # f.write(content)
      print('F://txt2json/index'+str(index)+'.json')
      with open('F://txt2json/index'+str(index)+'.json', 'w', encoding='utf-8') as f:
            # content = json.dumps(dict(),ensure_ascii=False)
            f.write(content)
            f.close()

```

#### 结果预览

![avatar](http://ezreal-yk.cn/images/tech/7/preview.bmp)
