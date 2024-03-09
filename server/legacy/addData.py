import requests
import firebase_admin

from firebase_admin import credentials
from firebase_admin import db
from firebase_admin import firestore

# Fetch the service account key JSON file contents
cred = credentials.Certificate('./serviceAccountKey.json')

firebase_admin.initialize_app(cred)
db = firestore.client()

db.collection("test").document("test").set("test")

# def fetch_data_for_page(page):
#     api_url = 'https://www.robotevents.com/api/v2/teams'
#     access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGJmMTdkZmIxZWRjMmRlZGQ5MjhmM2ZkODEzZDNkNWM1ZjNjOGU3OTUwY2JhYTIzODA5YzIwNzM3OGE4ZmFjZTZiMGIyODdlMjdmODM4NjIiLCJpYXQiOjE2OTE5ODQ4MDMuMDAyNTA3OSwibmJmIjoxNjkxOTg0ODAzLjAwMjUxMSwiZXhwIjoyNjM4NzU5NjAyLjk5NzEyOTksInN1YiI6IjExNzQzOSIsInNjb3BlcyI6W119.opzagy4WRMMhh3LQQhk0Fp-2NGo37AushuMGtU4cS6VwkxhsL-YdEzq18x1ocXLxj_Ip_1J41dL3NaVgCDUkrHZRA2eR-taKXKh7OZo3W-s9PJJjGKb4RyolAIPUWiQzQKdzbbKsvXoqdFAK8zfiEE_jjMIww9eXEEzd_COI2FtIp4BBgR84ss_RsuLWcT9r0OjW810iZTBzep96KwJPQDatq6RXTMIpc04HZcYUJah1l4hAjQlpReER4CKQ7w5IdPXzdOS1He-eToEwpIKTPXKoxnAcnwdOQWiJj3RAXFf9lVM5n9s7K-OdSMTBS3LKDlzxfJHAYQwC0Wpdr4LnMol4LcyZksyVXu-bb-vxxYeYm88ziIsLeCef0l9qHf_D46_jfln2e8cpaK88VBkKQmQO3gI8PB-QY4h0hGWwO3-WLV2vR_8TwwAoaw9Hds02NCKNNRzMI7ShqRyonjcTn5O1t2BwSrwnOVDTUGYf5EFWIjEbGB8B-xuqfCFqtq9u8kzeFqszgAUzdYOomsdjB35U5mWP7shOm4HRUm5I6OEmUTu5NZnRHLP8vZpIdS1_81WT2wCdyB6qxfIn3SuJk44EklLPzN4H6KkVH74j6J5d8CkB--NY74WyQVHapmGo4Dr9siIjg4am6w2nqYjbi3zVGxSk_aBYM5PoMDHnATY'  # Replace with your actual access token

#     response = requests.get(
#         f'{api_url}?page={page}&per_page=250?registered=true&program%5B%5D=1&grade%5B%5D=High%20School&grade%5B%5D=Middle%20School&myTeams=false',
#         headers={'Authorization': f'Bearer {access_token}'}
#     )

#     response_data = response.json()

#     for team in response_data['data']:
#         # Assuming you have a function to set the document in your Python equivalent of Firestore
#         set_document(team)

#     print(f'done a page')

#     return response_data['data']

# def fetch_all_data():
#     total_pages = 50  # should be 50 for full use (12-13k teams)
#     teams_data = []

#     for page in range(1, total_pages + 1):
#         teams_data.extend(fetch_data_for_page(page))

#     print('All data retrieved')

#     return teams_data

# def add_info(teams):
#     if teams:
#         try:
#             for team in teams:
#                 # Assuming you have a function to set the document in your Python equivalent of Firestore
#                 set_document(team)

#             print('done adding data')
#         except Exception as e:
#             print(f'Error adding data: {e}')

# # Assuming you have a function to set the document in your Python equivalent of Firestore
# def set_document(team):
#     db.collection("teams").document(team["team_name"]).set(team)
#     pass

# def main():
#     teams_data = fetch_all_data()
#     add_info(teams_data)

# if __name__ == '__main__':
#     main()
