from flask import Flask, render_template, request
import json

app = Flask(__name__)

@app.route('/')
def intro():
    return render_template('index.html')

@app.route('/game', methods=['POST'])
def quickGame():
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
    return render_template('game.html', yellowScored=0, blackScored=1)

@app.route('/yellowScore')
def updateYellowScore():
    return render_template('game.html', yellowScored=1, blackScored=0)

if __name__ == '__main__':
    app.run()