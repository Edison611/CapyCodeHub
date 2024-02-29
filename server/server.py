# Flask Server

from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)
@app.route('/data', methods=['GET'])
@cross_origin(supports_credentials=True)

def data():
    data = 'Hello from Flask!'
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
    