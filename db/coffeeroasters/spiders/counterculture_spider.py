import scrapy

from coffeeroasters.items import CoffeeItem

class CounterCultureSpider(scrapy.Spider):

	name = "counterculture"
	allowed_domains = ["counterculturecoffee.com"]
	start_urls = [
	    "https://counterculturecoffee.com/store/coffee?limit=all",
	]

	def parse(self, response):
		for href in response.css("h2.product-name > a::attr('href')"):
			url = response.urljoin(href.extract())			
			yield scrapy.Request(url, callback=self.parse_dir_contents)		

	def parse_dir_contents(self, response):		
		for sel in response.xpath('//div[contains(@class, "product-main-info")]'):		
			print sel;
			coffee = CoffeeItem()
			coffee['roaster'] = "Counter Culture"
			coffee['name'] = sel.xpath('div[contains(@class, "product-name")]/h1/text()').extract()[0]

			desc = sel.xpath('div[contains(@class, "product-short-description")]/p/text()').extract()
			if not desc:
				desc = sel.xpath('div[contains(@class, "product-short-description")]/text()').extract()
			
			coffee['desc'] = desc[0];
			coffee['link'] = response.url
				
			yield coffee