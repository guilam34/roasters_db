#!/bin/sh

mongo < initdb.js
scrapy crawl verve
scrapy crawl bluebottle
scrapy crawl intelligentsia
scrapy crawl heart
scrapy crawl counterculture
scrapy crawl stumptown
scrapy crawl fourbarrel
scrapy crawl georgehowell