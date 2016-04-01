import scrapy

from coffeeroasters.items import CoffeeItem

class BlueBottleSpider(scrapy.Spider):

	name = "bluebottle"
	allowed_domains = ["bluebottlecoffee.com"]
	start_urls = [
	    "https://bluebottlecoffee.com/store/coffee",
	]

	def parse(self, response):
		for href in response.css("div.spec-product-photo > a::attr('href')"):
			url = response.urljoin(href.extract())			
			yield scrapy.Request(url, callback=self.parse_dir_contents)		

	def parse_dir_contents(self, response):		
		for sel in response.xpath('//article'):		
			coffee = CoffeeItem()
			coffee['roaster'] = "Blue Bottle"
			coffee['name'] = sel.xpath('div[1]/div[1]/text()').extract()[0]
			coffee['desc'] = sel.xpath('*/p[contains(@class, "spec-overview")]/text()').extract()[0]
			coffee['link'] = response.url
				
			yield coffee