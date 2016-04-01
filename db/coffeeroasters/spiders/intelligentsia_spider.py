import scrapy

from coffeeroasters.items import CoffeeItem

class IntelligentsiaSpider(scrapy.Spider):

	name = "intelligentsia"
	allowed_domains = ["intelligentsiacoffee.com"]
	start_urls = [
	    "http://www.intelligentsiacoffee.com/products/coffee/",
	]

	def parse(self, response):
		for href in response.css("div.node-type-product-coffee > a:nth-child(1)::attr('href')"):
			url = response.urljoin(href.extract())			
			yield scrapy.Request(url, callback=self.parse_dir_contents)		

	def parse_dir_contents(self, response):		
		for sel in response.xpath('//div[contains(@class, "coffeeDetailBasicInfo")]'):		
			coffee = CoffeeItem()
			coffee['roaster'] = "Intelligentsia"
			coffee['name'] = sel.xpath('p[contains(@class, "coffeeDetailTitle")]/*/text()').extract()[0]
			coffee['desc'] = sel.xpath('div[contains(@class, "product-body")]/p/text()').extract()[0]
			coffee['link'] = response.url
				
			yield coffee