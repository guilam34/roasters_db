#!/bin/sh

mongo ds015770.mlab.com:15770/brewscovery_coffee -u master -p master < initdb.js
scrapy crawl verve
scrapy crawl bluebottle
scrapy crawl intelligentsia
scrapy crawl heart
scrapy crawl counterculture
scrapy crawl stumptown
scrapy crawl fourbarrel
scrapy crawl georgehowell