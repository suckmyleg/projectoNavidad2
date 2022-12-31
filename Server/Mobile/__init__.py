import json
print("IMPORTING CV2")
import cv2
print("IMPORTED CV2")
import requests
import threading
import time
from . FaceX import *




class Mobile:
	def __init__(self, ip):
		self.ip = ip
		self.flash = False
		self.frames = []
		self.lastFrame = b""
		self.x = FaceX()

		self.connected = False

		self.connectToCamera()

	def disconnectCamera(self):
		self.connected = False
		self.camera = False
		print("Camera disconnected")

	def connectToCamera(self):
		try:
			print("Connecting to camera")
			self.camera = cv2.VideoCapture(f'http://{self.ip}:4747/mjpegfeed')
			self.connected = True
			threading.Thread(target=self.mainGetFrames).start()
			print("Connected")
		except:
			self.connected = False
			print("Error trying to connect to camera")

	def changeFlash(self, status):
		if(self.flash != status):
			self.switchFlash()

	def switchFlash(self):
		self.flash = self.flash == False

		requests.get(f"http://{self.ip}:4747/cam/1/led_toggle")

	def mainGetFrames(self):
		print("Started grabbing frames")
		while self.connected:
			success, frame = self.camera.read()
			if not success:
				break
			else:
				try:
					frame = self.x.recogniseRaw(frame)
					ret, buffer = cv2.imencode('.jpg', frame)
					frame = buffer.tobytes()
					self.lastFrame = b'--frame\r\n'+b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n'
				except:
					pass
		print("Stopped grabbing frames")


	def gen_frames(self):
		lastFrame = False

		while True:
			frame = self.lastFrame

			if not frame == lastFrame:
				lastFrame = frame
				yield(frame)
				time.sleep(0.2)
			else:
				time.sleep(0.1)

mobile = Mobile("192.168.1.115")
