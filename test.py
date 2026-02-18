import json
with open("saves.json", "r", encoding="utf-8") as f:
    data = json.load(f)

with open("saves.json", "w", encoding="utf-8") as f:
    data["Users"].append({
        "login": "Soo",
        "password": "111"
    })
    json.dump(data, f, ensure_ascii=False, indent=2)