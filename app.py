from flask import Flask, render_template, request
import json

app = Flask(__name__)

@app.route('/')
def intro():
    return render_template('index.html')

@app.route('/game')
def quickGame():
    return render_template('game.html')

@app.route('/score')
def updateScore():
    score = request.args.get('score')
    print score
    score = int(score) + 1
    print score
    return render_template('game.html', score=score)

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

if __name__ == '__main__':
    app.run()