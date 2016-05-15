import scrapy

from coffeeroasters.items import CoffeeItem

class HeartSpider(scrapy.Spider):

	name = "heart"
	allowed_domains = ["heartroasters.com"]
	start_urls = [
	    "http://www.heartroasters.com/collections/beans",
	]

	def parse(self, response):
		for href in response.css("div.product > a::attr('href')"):
			url = response.urljoin(href.extract())			
			yield scrapy.Request(url, callback=self.parse_dir_contents)		

	def parse_dir_contents(self, response):		
		for sel in response.xpath('//div[contains(@class, "product-single")]/div[1]/div[2]/div[contains(@class, "wrapper")]'):		
			coffee = CoffeeItem()
			coffee['roaster'] = "Heart"
			coffee['name'] = sel.xpath('h1/text()').extract()[0]
			coffee['desc'] = sel.xpath('p[contains(@class, "flavors")]/text()').extract()[0]
			coffee['link'] = response.url
				
			yield coffee