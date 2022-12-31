from flask import Flask, render_template, Response
import json

app = Flask(__name__)

print("IMPORTING News")
import News
print("IMPORTING Clips")
import Clips
print("IMPORTING Profiles")
import Profiles
print("IMPORTING Sessions")
import Sessions
print("IMPORTING Suckcrack")
import Suckcrack
print("IMPORTING Mobile")
import Mobile

@app.route("/newsList")
def news_available():
	return json.dumps(News.news.get_news())

@app.route("/sign<nickname>")
def sign(nickname):
	key = Profiles.prof.add_profile(nickname)
	return json.dumps({"key":key})

@app.route("/log<nickname>|<key>")
def login(nickname, key):
	profile_data = Profiles.prof.get_profile(nickname, key)
	iid = False
	if profile_data:
		iid = Sessions.session.add_session({"nickname":profile_data["nickname"],
			"key":profile_data["key"]})
	return json.dumps({"sessionId":iid})

@app.route("/session<iid>")
def session(iid):
	data = Sessions.session.get_profile_data(iid)

	if data == False:
		return json.dumps(False)
	return json.dumps(Profiles.prof.get_profile(data["nickname"], data["key"]))

@app.route("/profile_data<profile>")
def profileData():
	return json.dumps(News.news.get_news())





@app.route("/suckcrackMatch<matchid>")
def suckcrack(matchid):
	return json.dumps(Suckcrack.p.match_data(matchid))

@app.route("/suckcrackDifficulty<matchid>")
def suckcrack2(matchid):
	return json.dumps(Suckcrack.p.calculate_difficulty(matchid))



@app.route("/MobileFlash")
def mobileFlash():
	return json.dumps(Mobile.mobile.flash)

@app.route("/MobileSwitchFlash")
def mobileSwitchFlash():
	Mobile.mobile.switchFlash()
	return json.dumps(Mobile.mobile.flash)

@app.route('/video_feed')
def video_feed():
    return Response(Mobile.mobile.gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/videoConnect')
def connect():
	Mobile.mobile.connectToCamera()
	return json.dumps(True)

@app.route('/videoDisconnect')
def disconnect():
	Mobile.mobile.disconnectCamera()
	return json.dumps(True)

app.run(host="192.168.1.104", debug=True)