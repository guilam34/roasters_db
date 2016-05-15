import scrapy

from coffeeroasters.items import CoffeeItem

class StumptownSpider(scrapy.Spider):

	name = "stumptown"
	allowed_domains = ["stumptowncoffee.com"]
	start_urls = [
	    "https://www.stumptowncoffee.com/coffee",
	]

	def parse(self, response):
		for href in response.xpath("//div[contains(@class, 'products') and contains(@class, '_content')]//div[contains(@class, '_item')]/a/@href"):
			url = response.urljoin(href.extract())			
			yield scrapy.Request(url, callback=self.parse_dir_contents)		

	def parse_dir_contents(self, response):		
		for sel in response.xpath('//div[contains(@id, "main")]/div[1]/div[1]/div[1]/div'):			
			coffee = CoffeeItem()
			coffee['roaster'] = "Stumptown"
			coffee['name'] = sel.xpath('//h1[contains(@class, "_title")]/text()').extract()[0]
			coffee['desc'] = sel.xpath('//div[contains(@class, "_description")]/p/text()').extract()[0]
			coffee['link'] = response.url
				
			yield coffee