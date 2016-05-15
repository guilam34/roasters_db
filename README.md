# Brewscovery

Brewscovery is a coffee roaster aggregator built on Node.js that enables the discovery of new coffees through keyword searches over flavor profiles.
The data is pulled directly from roasters' online storefronts via Python's Scrapy and pipelined into a MongoDB database which is queried through a Node.js server that processes user searches.
