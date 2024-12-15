import requests
import json
import os
def fetch_schedule():
    # API endpoint
    url = "https://www.robotevents.com/api/v2/teams/140100/matches?event%5B%5D=55647"
    

        # Make the API request
    response = requests.get(url)
    access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGJmMTdkZmIxZWRjMmRlZGQ5MjhmM2ZkODEzZDNkNWM1ZjNjOGU3OTUwY2JhYTIzODA5YzIwNzM3OGE4ZmFjZTZiMGIyODdlMjdmODM4NjIiLCJpYXQiOjE2OTE5ODQ4MDMuMDAyNTA3OSwibmJmIjoxNjkxOTg0ODAzLjAwMjUxMSwiZXhwIjoyNjM4NzU5NjAyLjk5NzEyOTksInN1YiI6IjExNzQzOSIsInNjb3BlcyI6W119.opzagy4WRMMhh3LQQhk0Fp-2NGo37AushuMGtU4cS6VwkxhsL-YdEzq18x1ocXLxj_Ip_1J41dL3NaVgCDUkrHZRA2eR-taKXKh7OZo3W-s9PJJjGKb4RyolAIPUWiQzQKdzbbKsvXoqdFAK8zfiEE_jjMIww9eXEEzd_COI2FtIp4BBgR84ss_RsuLWcT9r0OjW810iZTBzep96KwJPQDatq6RXTMIpc04HZcYUJah1l4hAjQlpReER4CKQ7w5IdPXzdOS1He-eToEwpIKTPXKoxnAcnwdOQWiJj3RAXFf9lVM5n9s7K-OdSMTBS3LKDlzxfJHAYQwC0Wpdr4LnMol4LcyZksyVXu-bb-vxxYeYm88ziIsLeCef0l9qHf_D46_jfln2e8cpaK88VBkKQmQO3gI8PB-QY4h0hGWwO3-WLV2vR_8TwwAoaw9Hds02NCKNNRzMI7ShqRyonjcTn5O1t2BwSrwnOVDTUGYf5EFWIjEbGB8B-xuqfCFqtq9u8kzeFqszgAUzdYOomsdjB35U5mWP7shOm4HRUm5I6OEmUTu5NZnRHLP8vZpIdS1_81WT2wCdyB6qxfIn3SuJk44EklLPzN4H6KkVH74j6J5d8CkB--NY74WyQVHapmGo4Dr9siIjg4am6w2nqYjbi3zVGxSk_aBYM5PoMDHnATY"
        # Check if the request was successful (status code 200)
    headers = {
            "Authorization": f"Bearer {access_token}"
        }
    
        # Make the API request with headers
    response = requests.get(url, headers=headers)
    if response.status_code == 200:  # Check for successful request
            response_json = response.json()  # Convert to JSON
            data = response_json.get('data') 
    
            if data:
            #    print(json.dumps(data, indent=4))
                print_json(data)  # Pretty print the data
            else:
                print("No 'data' key found in the response.")
    else:
            print(f"Failed to fetch data. Status code: {response.status_code}")
def get_team(alliance):
    team=[]
    teams = alliance.get('teams', [])
    for team_entry in teams:
        team_name = team_entry.get('team', {}).get('name')  # Extract team name
        if team_name:
            team.append(team_name)
    return team
# Call the function
def print_json(data):
    round_alliances = {"qualifiers": []}
    for match in data:
        round_number = match.get("matchnum")
        alliances = match.get('alliances', [])
        for alliance in alliances:
            if alliance.get('color') == 'red':
                 red_teams=get_team(alliance)
            if alliance.get('color') == 'blue':
                 blue_teams=get_team(alliance)             
        qualifier = {'qualifier_number': round_number,
                     'alliance_teams':red_teams,
                    'opponent_teams': blue_teams}
        round_alliances["qualifiers"].append(qualifier)
    
# Define the path to the public folder
    file_path = os.path.join("public", "data.json")

# Ensure the public folder exists
    os.makedirs(os.path.dirname(file_path), exist_ok=True)

# Save round_alliances to data.json
    with open(file_path, "w") as json_file:
        json.dump(round_alliances, json_file, indent=2)

    print(f"Data has been saved to {file_path}")
fetch_schedule()