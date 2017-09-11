from flask import Flask, render_template, request, jsonify
# import RPi.GPIO as GPIO
import time, json, jinja2
from threading import Thread
import os, random
        
app = Flask(__name__)

blackPin, yellowPin = 5, 6
# GPIO.setmode(GPIO.BCM)
# GPIO.setup(blackPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
# GPIO.setmode(GPIO.BCM)
# GPIO.setup(yellowPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
blackScored = False
yellowScored = False
thread = Thread()

def bakePie():
    # GPIO.add_event_detect(blackPin, GPIO.RISING)
    # GPIO.add_event_detect(yellowPin, GPIO.RISING)
    while True:
        global yellowScored
        global blackScored
        yellowScored = False
        blackScored = False
        # if GPIO.event_detected(yellowPin):
        #     print "yelow goal!"
        #     yellowScored = True
        # elif GPIO.event_detected(blackPin, GPIO.RISING):
        #     print "black goal"
        #     blackScored = True
        result = random.random()  
        # print result
        if result < 0.5:
            # print "black goal"
            blackScored = True
            time.sleep(1)
        else:
            # print "yelow goal!"
            yellowScored = True
            time.sleep(1)

# Returns a string representing the game data to be sent to JSON
def formatGameData(index, formData):
    gameData = {'_id': index,
                'bName': formData['black-name--modal'],
                'yName': formData['yellow-name--modal'],
                'bScore': formData['black-score--modal'],
                'yScore': formData['yellow-score--modal']}
    return json.dumps(gameData)
            
@app.route('/')
def intro():
    return render_template('index.html')

@app.route('/game', methods=['POST'])
def quickGame():
    global thread
    global finished
    thread = Thread(target=bakePie)
    thread.start()
    result = request.form
    return render_template('game.html', result=result, yellowScored=0, blackScored=0)

@app.route('/endgame', methods=['POST'])
def endGame():
    # gameData = request.args.get('gameData')
    with open('games.json') as f: 
        data = json.load(f)
    
    newInd = len(data)
    gameData = formatGameData(newInd, request.form)
    gameJson = json.loads(gameData)
    data.append(gameJson)

    with open('games.json', 'w') as f:
        json.dump(data, f)

    return render_template('index.html')

@app.route('/blackScore')
def updateBlackScore():
    yellow = int(request.args.get('yellow'))
    black = int(request.args.get('black')) + 1
    return render_template('game.html', result=None, yellowScored=yellow, blackScored=black)

@app.route('/yellowScore')
def updateYellowScore():
    return render_template('game.html', result=None, yellowScored=1, blackScored=0)

@app.route('/status')
def threadStatus():
    status = jsonify({"yellowScored": yellowScored, "blackScored": blackScored})
    return status

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
