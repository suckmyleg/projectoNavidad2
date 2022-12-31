import json

class News:
	def __init__(self):
		self.news = []

		self.load_news()

	def add_new(self, name, description, start=False, end=False, link=False, status="soon"):
		self.news.append({
			"name":name,
			"description":description,
			"start":start,
			"end":end,
			"link":link,
			"status":status
			})

	def load_news(self):
		self.news = json.loads(open("Content/News.json", "r").read())

	def get_news(self):
		return self.news


news = News()