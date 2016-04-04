import scrapy

from coffeeroasters.items import CoffeeItem

class StumptownSpider(scrapy.Spider):

	name = "stumptown"
	allowed_domains = ["stumptowncoffee.com"]
	start_urls = [
	    "https://www.stumptowncoffee.com/coffee",
	]

	def parse(self, response):
		for href in response.css("div.product-grid > a::attr('href')"):
			url = response.urljoin(href.extract())			
			yield scrapy.Request(url, callback=self.parse_dir_contents)		

	def parse_dir_contents(self, response):		
		for sel in response.xpath('//div[contains(@class, "detail")]/div/div'):		
			print sel;
			coffee = CoffeeItem()
			coffee['roaster'] = "Stumptown"
			coffee['name'] = response.xpath('//h1[contains(@class, "_title")]/text()').extract()[0]
			coffee['desc'] = response.xpath('//div[contains(@class, "_description")]/text()').extract()[0]
			coffee['link'] = response.url
				
			yield coffee