from flask import Flask, render_template, jsonify

import json

app = Flask(__name__)

# Load the data from Diabetes.json
with open('Diabetes.json') as f:
    data = json.load(f)

@app.route('/')
def index():
    return render_template('index.html')
    # Route for serving styles.css
@app.route('/styles.css')
def get_styles():
    return send_file('static/styles.css')

# Route for serving script.js
@app.route('/script.js')
def get_script():
    return send_file('static/script.js')
    # Route for serving script.js
@app.route('/Diabetes.json')
def get_fhir_data():
    return send_file('Diabetes.json')
@app.route('/get_data/<search_term>')
def get_filtered_data(search_term):
    if search_term.lower() == 'all':
        # Send the entire dataset
        return jsonify(data)
    else:
        # Filter the dataset for the specific name
        filtered_data = [entry for entry in data if entry['Name'].lower() == search_term.lower()]
        return jsonify(filtered_data)

if __name__ == '__main__':
    app.run(debug=True)



                

