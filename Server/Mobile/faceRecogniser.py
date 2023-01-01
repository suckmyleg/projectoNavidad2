from . tools import Data, Memory
import cv2

class Recogniser:
	def __init__(self):
		self.data = Data("faces.b", "pickle")
		self.memory = Memory()

		self.cascPath = "Mobile/Cascades/haarcascade_frontalface_default.xml"
		self.faceCascade = cv2.CascadeClassifier(self.cascPath)

	def facesFromImage(self, imageGray):
		#output, status = self.memory.search(imageGray)
		
		#if status:
		#	return output

		return self.faceCascade.detectMultiScale(
			imageGray,
			scaleFactor=1.2,
			minNeighbors=5,
			minSize=(30, 30),
			flags = cv2.CASCADE_SCALE_IMAGE
			)

	def showFaces(self, image, faces):
		for (x,y,w,h) in faces:
			cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)
		return image

	def recogniseFaces(self, image):
		imageGray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

		faces = self.facesFromImage(imageGray)
		
		return self.showFaces(image, faces)

	def prepareImage(self, content):
		content = cv2.resize(content, (50, 50), interpolation = cv2.INTER_AREA)
		return content

	def search(self, content):
		content = self.prepareImage(content)

		#output, status = self.memory.search(content)
		
		#if status:
		#	return output
		
		output = self.recogniseFaces(content)

		#self.memory.remember(resized, output)

		return output