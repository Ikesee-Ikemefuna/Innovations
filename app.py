from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)

# Load the data from Diabetes.json
with open('Diabetes.json') as f:
    data = json.load(f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_data/<name>')
def get_data(name):
    filtered_data = [entry for entry in data if entry['Name'].lower().startswith(name.lower())]
    return jsonify(filtered_data)

if __name__ == '__main__':
    app.run(debug=True)
