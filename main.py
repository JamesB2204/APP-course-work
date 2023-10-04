from flask import Flask, render_template, jsonify, request, make_response
import sys, json, os

app = Flask(__name__)

@app.route('/')
def main():
    return render_template("index.html")

@app.get("/jokes.json")
def joke_get():
  with open("./data/jokes.json", "r") as f:
    data = json.load(f)
  return jsonify(data)

@app.put("/jokes.json")
def joke_put():
  data = request.get_json()
  with open("./data/jokes.json", "w") as f:
    json.dump(data, f)
  return "", 200
    


app.run(host='0.0.0.0', port=81)
