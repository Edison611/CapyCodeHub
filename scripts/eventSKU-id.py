# -----------------------------------------------------------------------------
# Name:        Event SKU -> id
# Purpose:     Change event SKU's to their id
#
# Author:      Edison Ying
# Created:     24-Dec-2023
# Updated:     19-Aug-2026
# -----------------------------------------------------------------------------
import json
import requests
import math

season = 204

BASE_URL = "https://events.vex.com/api/v2/events"
token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMjE5MmEyY2U3NjhlZWViNTRlMTQ1NTMzNGUwZDZhZDdjM2IyMjVkZDllZDRlNGQxYjFmYzIxNzU2ZTJhY2Q5ZjdhODllOTlkNzA3OGMyYTciLCJpYXQiOjE2NzI3NTg0ODguNjgzMDE3LCJuYmYiOjE2NzI3NTg0ODguNjgzMDIwMSwiZXhwIjoyNjE5NTI5Njg4LjY3NzI3MDksInN1YiI6IjExMDgzMiIsInNjb3BlcyI6W119.UPXqld7tHv6sRyUufI6VWQR09NbGa65gjf-Epsjwdd0HCqhlOUB8SRCONBUYkqsO8FuH4MgsLq0m4g5QTlwfNMqq3aRfpTBePJI4eawBTOQY7u5fk7hgWDcPXHng08IVeCFyopJl6Zy4MVTVslVqiZmgc43Vz9A9mwTtGSRhmZD_AqOmN2tYbP8y63pfjEpJ2X-gqo0416cRj95FeNLUMDSUZBpQHRWoXfrQAUxaj6qfxKar0eLDTWjAGkpMkKa28HWTYmkbajgSKPh23ubtRWWq_z152Oum5zQcdPzPZZrkrCvH9h2o0pCt3sr3zrEVMNeN96bf-e9oD1b-CY6Tk7PCTCdecxJe5DcFVLOdCqOpIjdtVbzNWHKtltDI5ttqHGGl03RdGrdNKbKveT5xAC2TDnakJiNIwANbtPq7Wj3V-doLTAJP2w8U97dQM_G7CrBBdgMlXkUwdq1gEqQr0bCrD3z9CBwg3S2RmQjBIpS7EkrnlU_wBPzYk0RAlaT_UXgqDUiy47fax7asy8LIgiy5odXxA0xXgw34BOBp1GGk5FREnaJ61Gl_R6W99RFcR1b_uxAMscl5hgdGYG63nv7vfAcMuOxotHvd-Fc-ram3n3jBawgiecOxaJyhE2asQtm-wOKynTi5-vniX_54GtIF49OhpGT9ZeefLEudeRo'
headers = {'Accept': 'application/json', "Authorization": "Bearer " + token}

url = f"{BASE_URL}?season%5B%5D={season}&myEvents=false&eventTypes%5B%5D=tournament"
r = requests.get(url, headers=headers)
rj = r.json()

data = []

total = rj["meta"]["total"]

for page in range(math.ceil(total/250)):
    url = f"{BASE_URL}?page={page+1}&per_page=250&season%5B%5D={season}&myEvents=false&eventTypes%5B%5D=tournament"
    r = requests.get(url, headers=headers)
    rj = r.json()
    events = rj["data"]
    for event in events:
        data.append({
            "id": event["id"],
            "sku": event["sku"],
            "name": event["name"],
            "start": event["start"],
            "end": event["end"],
            "location": event["location"],
        })

    print("Page:", page+1, "DONE")
    print(data)

with open(f"eventData_{season}.json", 'w') as f:
    json.dump(data, f)
