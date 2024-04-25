# Flask Server
from stats import stats_calc
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)
@app.route('/stats', methods=['POST'])
@app.route('/trueskills', methods=['GET'])

@cross_origin(supports_credentials=True)

def run():
    data = request.get_json()
    results = stats_calc(data)
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
    