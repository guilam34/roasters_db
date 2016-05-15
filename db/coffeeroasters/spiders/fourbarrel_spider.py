import scrapy

from coffeeroasters.items import CoffeeItem

class FourBarrelSpider(scrapy.Spider):

	name = "fourbarrel"
	allowed_domains = ["fourbarrelcoffee.com"]
	start_urls = [
	    "http://fourbarrelcoffee.com/product-category/coffees/",
	    "http://fourbarrelcoffee.com/product-category/delapaz/"
	]

	def parse(self, response):
		for href in response.css("div.product > a::attr('href')"):
			url = response.urljoin(href.extract())			
			yield scrapy.Request(url, callback=self.parse_dir_contents)		

	def parse_dir_contents(self, response):		
		for sel in response.xpath('//div[contains(@class, "product-details")]'):		
			coffee = CoffeeItem()
			coffee['roaster'] = "Four Barrel"
			coffee['name'] = sel.xpath('//span[contains(@class, "product_title")]/text()').extract()[0]
			coffee['desc'] = sel.xpath('//div[contains(@class, "flavor")]/div/span[2]/text()').extract()[0]
			coffee['link'] = response.url
				
			yield coffee