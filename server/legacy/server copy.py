import requests
import json

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
                print(json.dumps(data, indent=4))
                print_json(data)  # Pretty print the data
            else:
                print("No 'data' key found in the response.")
    else:
            print(f"Failed to fetch data. Status code: {response.status_code}")
# Call the function
def print_json(data):
    round_alliances = []
    for match in data:
        round_number = match.get("round")
        for alliance in match.get("alliances", []):
            color = alliance.get("color")
            team_names = [team["team"]["name"] for team in alliance.get("teams", [])]
            round_alliances.append({
            "round": round_number,
            "color": color,
            "teams": team_names
        })

# Print extracted data
    for entry in round_alliances:
        print(entry) 
fetch_schedule()
