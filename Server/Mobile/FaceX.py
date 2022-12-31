from . camerasManager import Manager
from . faceRecogniser import *
import requests
from . tools import Data, Memory
import numpy as np

def short(content, maxx):
	try:
		return str(content)[0:maxx]+"..."
	except:
		return content

class FaceX:
	def __init__(self):
		self.recogniser = Recogniser()
		self.manager = Manager()
		self.memory = Memory()

	def recogniseUrl(self, url):
		content, status = self.memory.search(url)
		
		if not status:
			content = requests.get(url, stream=True).raw

			content = np.asarray(bytearray(content.read()), dtype="uint8")
			content = cv2.imdecode(content, cv2.IMREAD_COLOR)

			self.memory.remember(url, content)

		output = self.recogniser.search(content)

		return output

	def recogniseRaw(self, content):
		output = self.recogniser.search(content)

		return output

	def recogniseFile(self, src):
		content, status = self.memory.search(src)
		
		if not status:
			content = cv2.imread(src)

			self.memory.remember(src, content)

		output = self.recogniser.search(content)

		return output

	def recognise(self, method, content):
		try:
			fun = getattr(self, "recognise"+method)
		except:
			print("Incorrect method")
			return "Incorrect method"
		else:
			try:
				output = fun(content)
				#print(f"Recognise:\n Method: {method}\n Content: {short(content, 120)}\n Output: {short(output, 200)}")
				return output
			except Exception as e:
				print(e)
				return e