import scrapy

from coffeeroasters.items import CoffeeItem

class VerveSpider(scrapy.Spider):

	name = "verve"
	allowed_domains = ["vervecoffee.com"]
	start_urls = [
	    "http://vervecoffee.com/collections/coffee/",
	]

	def parse(self, response):
		for href in response.css("div.partial--product > a::attr('href')"):
			url = response.urljoin(href.extract())			
			yield scrapy.Request(url, callback=self.parse_dir_contents)		

	def parse_dir_contents(self, response):		
		for sel in response.xpath('//div[contains(@class, "details")]'):		
			coffee = CoffeeItem()
			coffee['roaster'] = "Verve"
			coffee['name'] = sel.xpath('h1[contains(@class, "title")]/text()').extract()[0]
			coffee['desc'] = sel.xpath('div[contains(@class, "description")]/p[1]/text()').extract()[0]
			coffee['link'] = response.url
				
			yield coffee