import random
import string
import time
import json
import operator
import threading
import copy

name_length = 2

keys = string.ascii_lowercase+'1234567890'

difs = len(keys)

def evaluate(s):
	ops = {
    '+' : operator.add,
    '-' : operator.sub,
    '*' : operator.mul,
    '/' : operator.truediv,
    '%' : operator.mod,
    '^' : operator.xor,
	}

	def eval_binary_expr(op1, oper, op2):
		op1, op2 = float(op1), float(op2)
		return ops[oper](op1, op2)

	return eval_binary_expr(*(s.split()))

def get_random_string(length=name_length):
	return ''.join(random.choice(keys) for i in range(length))

class Autosave:
	def __init__(self, data, save):
		self.last_data = False
		self.data = data
		self.save = save
		threading.Thread(target=self.main).start()

	def log(self, l):
		if True:
			print(f"\n[Autosaving] {l}\n")
 
	def main(self):
		self.log("Started autosaving")
		while True:
			try:
				time.sleep(5)

				d = json.dumps(self.data)

				if not d == self.last_data:
					self.save()
					self.log("Autosaved")
			except Exception as e:
				self.log(e)
				self.log("Service busy")
			else:
				self.last_data = d



class PFTR:
	def __init__(self):
		self.data_location = "Content/Suckcrack.json"
		self.data = self.get_data()
		self.autosave = Autosave(self.data, self.save_data)

	def get_data(self):
		try:
			return json.loads(open(self.data_location, "r").read())
		except:
			return {"servers":{}, "matches":{}}
		
	def save_data(self):
		d = json.dumps(self.data, indent=5)
		open(self.data_location, "w").write(d)

	def new_match_id(self):
		i = 0

		while True:
			i += 1

			match_id = get_random_string()
			
			try:
				x = self.data["matches"][match_id]
			except:
				return match_id
			else:
				if i == self.n_comb():
					return False

	def new_server_name(self):
		i = 0

		while True:
			i += 1
			
			name = get_random_string()

			try:
				x = self.data["servers"][name]
			except:
				return name
			else:
				if i == self.n_comb():
					return False

	def rights(self, name, key, match=False):
		try:
			server = self.data["servers"][name]

			if server["key"] in [key, False]:
				if match:
					if match in server["matches"]:
						return True
					else:
						return False
				else:
					return True
			return False

		except:
			return False



	def reload(self, name, key, match, data):
		if self.rights(name, key, match):
			try:
				match_data = self.data["matches"][match]

				match_data["data"] = data
				match_data["analysis_data"] = {
					"start":time.time(),
					"players":{
						"total":data["players"]["total"],
						"actual":data["players"]["left"]},
					}

				self.data["matches"][match] = match_data

				return self.calculate_difficulty(name, key)
			except Exception as e:
				return 500
		else:
			return 403

	def create_password(self, name, key=""):
		if self.rights(name, key):
			try:
				key = get_random_string(10)

				self.data["servers"][name]["key"] = key

				return key
			except:
				return 500
		else:
			return 403

	def start_match(self, name, key, match):
		if self.rights(name, key, match):
			try:
				self.data["matches"][match]

				return 200
			except Exception as e:
				return 500
		else:
			return 403

	def log_players(self, name, key, match, data={}):
		if self.rights(name, key, match):
			try:
				match_data = self.data["matches"][match]

				for player in data["players"]:
					if player["id"] not in match_data["match_conf"]["players_list"]:
						match_data["match_conf"]["players_list"].append(player["id"])

				self.data["matches"][match] = match_data

				return 200
			except Exception as e:
				return 500
		else:
			return 403

	def start_match(self, name, key, match):
		if self.rights(name, key, match):
			try:
				self.data["matches"][match]["analysis_data"]["start"] = time.time()

				return 200
			except Exception as e:
				return 500
		else:
			return 403

	def host_new_match(self, name, key, data={}):
		if self.rights(name, key):
			try:
				match_id = self.new_match_id()

				if not match_id:
					return 500

				try:
					self.data["servers"][name]["matches"].append(match_id)
				except:
					return 404

				self.data["matches"][match_id] = {
					"data":data,
					"analysis_data":{
					"start":False,
					"players":{
						"total":0,
						"actual":0},
					},
					"delay": 400
					}

				try:
					self.data["matches"][match_id]["analysis_data"] = {
					"start":time.time(),
					"players":{
						"total":data["players"]["total"],
						"actual":data["players"]["left"]}}
				except:
					pass
				
				return match_id
			except:
				return 500
		else:
			return 403

	def s_time(self, t):
		t = int(time.time()-t)

		return (int(t),int(t/60),int(t/24))

	def calculate_difficulty(self, match):
		data = self.match_all_data(match)

		if data == 500:
			return 500




		s_s,s_m,s_h = self.s_time(data["analysis_data"]["start"]) 

		values = [
		["%since_s%", s_s],
		["%since_m%", s_m],
		["%since_h%", s_h],

		["%players%", data["analysis_data"]["players"]["actual"]],
		["%players_deade%", data["analysis_data"]["players"]["total"]],
		["%players_dead%", data["analysis_data"]["players"]["total"]-data["analysis_data"]["players"]["actual"]],


		["%random_1%", random.randint(0,1)],
		["%random_2%", random.randint(0,2)],
		["%random_3%", random.randint(0,3)],
		["%random_4%", random.randint(0,4)],
		["%random_5%", random.randint(0,5)],
		["%random_6%", random.randint(0,6)],
		["%random_7%", random.randint(0,7)],
		["%random_8%", random.randint(0,8)],
		["%random_9%", random.randint(0,9)],
		["%random_10%", random.randint(0,10)],
		["%random_100%", random.randint(0,100)],
		["%random_1000%", random.randint(0,1000)]


		]

		difficulty_form = {
			"pvp":"2 * %since_m%",
			"time":"%since_s% + 0",
			"increment_s":"%since_s% * 0.001",
			"moob_speed":"%increment_s% + %time%",
			"moob_damage":"%moob_speed% * %pvp%",
			"minusBlock":"%since_m% / 100",
			"muro_size":"2000 - %minusBlock%"
			}

		difficulty = {}

		for k in difficulty_form.keys():
			val = difficulty_form[k]

			for v in values:
				if v[0] in val:
					val = val.replace(v[0], str(v[1]))

			val = evaluate(val)
			values.append([f"%{k}%", val])
			difficulty[k] = val

		return difficulty

	def create_new_server(self):
		name = self.new_server_name()

		if not name:
			return 500

		self.data["servers"][name] = {
			"name":name,
			"key":False,
			"matches":[],
			"created":time.time()
			}

		return name

	def match_all_data(self, match_id):
		try:
			return self.data["matches"][match_id]
		except:
			return 500

	def match_data(self, match_id):
		try:
			return self.data["matches"][match_id]["data"]
		except:
			return 500

	def get_server_data_id(self, name):
		pass

	def get_server_data_custom_name(self, custom_name):
		pass

	def get_delay_request(self, match_id):
		try:
			return self.data["servers"][match_id]["delay"]
		except:
			return 404

	def set_delay_request(self, name, key, delay, match_id):
		if self.rights(name, key):
			try:
				self.data["matches"][match_id]["delay"] = delay

				return 200
			except:
				return 500
		else:
			return 403

	def n_comb(self):
		return difs**name_length

	def available(self):
		return self.n_comb() - len(self.data["matches"])

	def available_porc(self):
		return (self.available()*100)/self.n_comb()


p = PFTR()

"""
name = p.create_new_server()
print("ServerName: ", name)
key = p.create_password(name, "")
print("Password: ", key)
match = p.host_new_match(name, key)
print("MatchName: ", match)
while True:
	diff = p.calculate_difficulty(match)
	print(diff)
	time.sleep(0.5)
	500
"""