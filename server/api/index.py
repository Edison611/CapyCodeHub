# Flask Server
import numpy as np
# import requests
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
# from stats import stats

app = Flask(__name__)
CORS(app, support_credentials=True)
@cross_origin(supports_credentials=True)

@app.route('/', methods=['GET'])
def test():
    # print(np.__version__)
    return jsonify({'message': 'Hello World'})

@app.route('/stats', methods=['POST'])
def stats_function():
    data = request.get_json()
    matchData = data['matchData']
    teamData = data['teamData']
    if len(matchData) == 0 or len(teamData) == 0:
        return jsonify({})

    # Helper Maps Initialization
    numToTeam = {}
    teamToNum = {}
    for i in range(len(teamData)):
        info = teamData[i]
        numToTeam[i] = info['number']
        teamToNum[info['number']] = i

    oprArr = []
    oprScores = []

    dprArr = []
    dprScores = []

    for match in matchData:
        if match['round'] != 2:
            continue
        r1 = [0 for _ in range(len(teamData))]
        r2 = [0 for _ in range(len(teamData))]
        team1, team2 = [], []
        a1 = match['alliances'][0]
        a2 = match['alliances'][1]

        t1, t2 = match['alliances'][0]['teams'][0]['team']['name'], match['alliances'][0]['teams'][1]['team']['name']
        t3, t4 = match['alliances'][1]['teams'][0]['team']['name'], match['alliances'][1]['teams'][1]['team']['name']

        r1[teamToNum[t1]], r1[teamToNum[t2]] = 1, 1
        oprArr.append(r1)
        oprScores.append(a1['score'])
        dprArr.append(r1)
        dprScores.append(a2['score'])

        r2[teamToNum[t3]], r2[teamToNum[t4]] = 1, 1
        oprArr.append(r2)
        oprScores.append(a2['score'])
        dprArr.append(r2)
        dprScores.append(a1['score'])

    # Convert to Numpy for more vector functions
    oprArr = np.array(oprArr)
    oprScores = np.array(oprScores)
    dprArr = np.array(dprArr)
    oprScores = np.array(oprScores)

    # Transpose Array
    oprTranspose = np.transpose(oprArr)
    oprLS = np.matmul(oprTranspose, oprArr)
    dprTranspose = np.transpose(dprArr)
    dprLS = np.matmul(dprTranspose, dprArr)
    # print(LS)

    # Scores of Matches Array
    oprRS = np.matmul(oprTranspose, oprScores)
    dprRS = np.matmul(dprTranspose, dprScores)
    # print(RS)

    oprX = np.linalg.lstsq(oprLS, oprRS, rcond=None)
    dprX = np.linalg.lstsq(dprLS, dprRS, rcond=None)

    teamsOPR = {}
    teamsDPR = {}
    for i in range(len(oprX[0])):
        teamsDPR[numToTeam[i]] = round(dprX[0][i], 3)
        teamsOPR[numToTeam[i]] = round(oprX[0][i], 3)
    
    teamsCCWM = {}
    for i in teamsOPR:
        teamsCCWM[i] = round(teamsOPR[i] - teamsDPR[i], 3)

    allData = {'OPR': teamsOPR, 'DPR': teamsDPR, 'CCWM': teamsCCWM}
    return jsonify(allData)


# if __name__ == '__main__':
#     app.run(debug=True)
    