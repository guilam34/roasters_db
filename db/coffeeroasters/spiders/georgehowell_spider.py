import scrapy

from coffeeroasters.items import CoffeeItem

class GeorgeHowellSpider(scrapy.Spider):

	name = "georgehowell"
	allowed_domains = ["store.georgehowellcoffee.com"]
	start_urls = [
	    "https://store.georgehowellcoffee.com/coffees/",
	]

	def parse(self, response):
		for href in response.css("div.buyLink > a::attr('href')"):
			url = response.urljoin(href.extract())			
			yield scrapy.Request(url, callback=self.parse_dir_contents)		

	def parse_dir_contents(self, response):		
		for sel in response.xpath('//div[contains(@id, "container")]'):				
			coffee = CoffeeItem()
			coffee['roaster'] = "George Howell"
			coffee['name'] = response.xpath('//h1[contains(@class, "page-title")]/text()').extract()[0]
			coffee['desc'] = response.xpath('//p[contains(@class, "tasting-notes")]/text()').extract()[0]
			coffee['link'] = response.url
				
			yield coffee