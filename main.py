import requests
url="https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt"

r=requests.get(url)

print(r.text)