from flask import Flask, jsonify
import requests
import json
import os

app = Flask(__name__)

# API access token
ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGJmMTdkZmIxZWRjMmRlZGQ5MjhmM2ZkODEzZDNkNWM1ZjNjOGU3OTUwY2JhYTIzODA5YzIwNzM3OGE4ZmFjZTZiMGIyODdlMjdmODM4NjIiLCJpYXQiOjE2OTE5ODQ4MDMuMDAyNTA3OSwibmJmIjoxNjkxOTg0ODAzLjAwMjUxMSwiZXhwIjoyNjM4NzU5NjAyLjk5NzEyOTksInN1YiI6IjExNzQzOSIsInNjb3BlcyI6W119.opzagy4WRMMhh3LQQhk0Fp-2NGo37AushuMGtU4cS6VwkxhsL-YdEzq18x1ocXLxj_Ip_1J41dL3NaVgCDUkrHZRA2eR-taKXKh7OZo3W-s9PJJjGKb4RyolAIPUWiQzQKdzbbKsvXoqdFAK8zfiEE_jjMIww9eXEEzd_COI2FtIp4BBgR84ss_RsuLWcT9r0OjW810iZTBzep96KwJPQDatq6RXTMIpc04HZcYUJah1l4hAjQlpReER4CKQ7w5IdPXzdOS1He-eToEwpIKTPXKoxnAcnwdOQWiJj3RAXFf9lVM5n9s7K-OdSMTBS3LKDlzxfJHAYQwC0Wpdr4LnMol4LcyZksyVXu-bb-vxxYeYm88ziIsLeCef0l9qHf_D46_jfln2e8cpaK88VBkKQmQO3gI8PB-QY4h0hGWwO3-WLV2vR_8TwwAoaw9Hds02NCKNNRzMI7ShqRyonjcTn5O1t2BwSrwnOVDTUGYf5EFWIjEbGB8B-xuqfCFqtq9u8kzeFqszgAUzdYOomsdjB35U5mWP7shOm4HRUm5I6OEmUTu5NZnRHLP8vZpIdS1_81WT2wCdyB6qxfIn3SuJk44EklLPzN4H6KkVH74j6J5d8CkB--NY74WyQVHapmGo4Dr9siIjg4am6w2nqYjbi3zVGxSk_aBYM5PoMDHnATY"

@app.route('/fetch_schedule', methods=['GET'])
def fetch_schedule():
    url = "https://www.robotevents.com/api/v2/teams/140100/matches?event%5B%5D=55647"
    headers = {"Authorization": f"Bearer {ACCESS_TOKEN}"}

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        response_json = response.json()
        data = response_json.get('data')

        if data:
            round_alliances = {"qualifiers": []}
            for match in data:
                round_number = match.get("matchnum")
                alliances = match.get('alliances', [])
                red_teams, blue_teams = [], []

                for alliance in alliances:
                    if alliance.get('color') == 'red':
                        red_teams = get_team(alliance)
                    if alliance.get('color') == 'blue':
                        blue_teams = get_team(alliance)

                qualifier = {
                    'qualifier_number': round_number,
                    'alliance_teams': red_teams,
                    'opponent_teams': blue_teams
                }
                round_alliances["qualifiers"].append(qualifier)

            return jsonify(round_alliances)
        else:
            return jsonify({"error": "No 'data' key found in the response."}), 404
    else:
        return jsonify({"error": f"Failed to fetch data. Status code: {response.status_code}"}), response.status_code

def get_team(alliance):
    team = []
    teams = alliance.get('teams', [])
    for team_entry in teams:
        team_name = team_entry.get('team', {}).get('name')
        if team_name:
            team.append(team_name)
    return team

if __name__ == '__main__':
    # Ensure the public folder exists
    app.run(debug=True)
