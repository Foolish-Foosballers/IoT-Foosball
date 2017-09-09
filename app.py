from flask import Flask, render_template, request, jsonify
import RPi.GPIO as GPIO
import time, json, jinja2
from threading import Thread
import os
        
app = Flask(__name__)
GPIO.setmode(GPIO.BCM)
GPIO.setup(6, GPIO.IN, pull_up_down=GPIO.PUD_UP)
thread = Thread()
finished = False

def bakePie():
    #GPIO.add_event_detect(6, GPIO.RISING)
##    while True:
##        print "no"
##        if GPIO.event_detected(6):
##            print "goal!"
##            finished = True
##            return
    finished = True
            
@app.route('/')
def intro():
    return render_template('index.html')

@app.route('/game', methods=['POST'])
def quickGame():
    global thread
    global finished
    finished = False
    thread = Thread(target=bakePie)
    thread.start()
    print finished
    result = request.form
    return render_template('game.html', result=result, yellowScored=0, blackScored=0)

@app.route('/endgame')
def endGame():
    gameData = request.args.get('gameData')
    gameJson = json.loads(gameData)

    with open('games.json') as f: 
        data = json.load(f)
    data.append(gameJson)
    with open('games.json', 'w') as f:
        json.dump(data, f)

    return render_template('index.html')

@app.route('/blackScore')
def updateBlackScore():
    return render_template('game.html', result=None, yellowScored=0, blackScored=1)

@app.route('/yellowScore')
def updateYellowScore():
    return render_template('game.html', result=None, yellowScored=1, blackScored=0)

@app.route('/status')
def threadStatus():
    print jsonify(dict(status=('finished' if finished else 'running')))
    return jsonify(dict(status=('finished' if finished else 'running')))

if __name__ == "__main__":
    app.run(host="0.0.0.0")
