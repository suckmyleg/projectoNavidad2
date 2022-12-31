import json, random, string

class Profiles:
	def __init__(self):
		self.profiles = {}

		self.load_profiles()

	def getKey(self, length=10):
		return "".join(random.choice(string.ascii_letters) for _ in range(length))


	def add_profile(self, name):
		try:
			a = self.profiles[name]
			return False
		except:
			pass

		key = self.getKey()

		self.profiles[name] = {
		"nickname":name,
		"key":key,
		"matches":[]
		}
		return key

	def save_profiles(self):
		open("Content/Profiles.json", "w").write(json.dumps(self.profiles))

	def load_profiles(self):
		try:
			self.profiles = json.loads(open("Content/Profiles.json", "r").read())
		except:
			self.save_profiles()

	def get_profile(self, name, key):
		try:
			if self.profiles[name]["key"] == key:
				return self.profiles[name]
		except:
			pass

		return False


prof = Profiles()
