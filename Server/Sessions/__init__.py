import json, random, string

class Session:
	def __init__(self):
		self.sessions = {}

		self.load_sessions()

	def getUniqueId(self, length=10):
		while True:
			iid = "".join(random.choice(string.ascii_letters) for _ in range(length))
			if not iid in self.sessions.keys():
				return iid

	def add_session(self, profile_data):
		iid = self.getUniqueId()
		self.sessions[iid] = profile_data
		self.save_sessions()
		return iid

	def save_sessions(self):
		open("Content/Sessions.json", "w").write(json.dumps(self.sessions))

	def load_sessions(self):
		try:
			self.sessions = json.loads(open("Content/Sessions.json", "r").read())
		except:
			self.save_sessions()

	def get_profile_data(self, iid):
		try:
			return self.sessions[iid]
		except:
			return False


session = Session()