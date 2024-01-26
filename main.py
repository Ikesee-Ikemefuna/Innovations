from flask import Flask, request, jsonify
import json
import os

app = Flask(__name__)

# Your existing Diabetes.json data
DIABETES_FILE = 'Diabetes.json'

@app.route('/', methods=['GET'])
def get_diabetes_data():
    try:
        with open(DIABETES_FILE, 'r') as file:
            diabetes_data = json.load(file)
        return jsonify(diabetes_data)

    except FileNotFoundError:
        return jsonify({"status": "error", "message": "Diabetes.json not found"}), 404
    except json.JSONDecodeError as e:
        return jsonify({"status": "error", "message": f"Error decoding JSON: {str(e)}"}), 500

@app.route('/', methods=['POST'])
def post_fhir_bundle():
    try:
        fhir_bundle_data = request.get_json()

        # Validate FHIR bundle data
        if not validate_fhir_data(fhir_bundle_data):
            return jsonify({"status": "error", "message": "Invalid FHIR bundle data"}), 400

        converted_data = convert_fhir_to_diabetes(fhir_bundle_data)

        with open(DIABETES_FILE, 'r') as file:
            diabetes_data = json.load(file)

        diabetes_data.extend(converted_data)

        with open(DIABETES_FILE, 'w') as file:
            json.dump(diabetes_data, file, indent=2)

        return jsonify({"status": "success", "message": "Data added to Diabetes.json"})

    except FileNotFoundError:
        return jsonify({"status": "error", "message": "Diabetes.json not found"}), 404
    except json.JSONDecodeError as e:
        return jsonify({"status": "error", "message": f"Error decoding JSON: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

def validate_fhir_data(fhir_data):
    # Implement your validation logic here
    # Check if required fields are present, have the right data types, etc.
    # Return True if the data is valid, False otherwise
    return True

# The rest of your code remains unchanged
