from flask import Flask, render_template, request
import json

app = Flask(__name__)

@app.route('/')
def quickGame():
    return render_template('index.html')

@app.route('/<score>')
def updateScore(score):
    score = int(score) + 1
    return render_template('index.html', score=score)

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