import json, pickle

methods = {"json":[json, ""], "pickle":[pickle, "b"]}

class Memory:
	def __init__(self):
		self.data = Data("memory", "pickle", [[], []])

	def search(self, content):
		try:
			data = self.data.data[1][self.data.data[0].index(content)]

			print("Rehusing data")

			return data, True
		except:
			return False, False

	def remember(self, content, output):
		#print("Creating new memory")
		self.data.data[0].append(content)
		self.data.data[1].append(output)
		#self.data.save()

class Data:
	def __init__(self, dataLocation, method, default_data=False, loadOnStart=True, overwriteOnFail=True):
		self.dataLocation = dataLocation
		self.method = method
		self.methodClass = methods[method][0]
		self.fileMode = methods[method][1]
		self.data = default_data
		self.writeFile = False
		self.overwriteOnFail = overwriteOnFail
		self.loadOnStart = loadOnStart

		if self.loadOnStart:
			self.load()

	def load(self):
		try:
			print(f"[Data] [{self.method}] [{self.dataLocation}] Loading")
			self.data = self.methodClass.loads(open(self.dataLocation, "r"+self.fileMode).read())
			print(f"[Data] [{self.method}] [{self.dataLocation}] Loaded")
			return True
		except:
			print(f"[Data] [{self.method}] [{self.dataLocation}] Error loading")

			if self.overwriteOnFail and not self.writeFile:
				print(f"[Data] [{self.method}] [{self.dataLocation}] OVERWRITTING")
				self.save()

		self.writeFile = open(self.dataLocation, "w"+self.fileMode)

	def save(self):
		try:
			try:
				print(f"[Data] [{self.method}] [{self.dataLocation}] Saving")
				self.writeFile.write(self.methodClass.dumps(self.data))
				print(f"[Data] [{self.method}] [{self.dataLocation}] Saved")
				return True
			except Exception as e:
				print(e)
				self.writeFile = open(self.dataLocation, "w"+self.fileMode)
				return self.save()
		except Exception as e:
			print(f"[Data] [{self.method}] [{self.dataLocation}] Error saving")
			return False