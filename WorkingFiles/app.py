# import Flask
from flask import Flask, render_template, redirect, url_for
from flask_pymongo import PyMongo
from flask.json import jsonify


# 2. Create an app, being sure to pass __name__
app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/proj3"
mongo = PyMongo(app)

# 3. Define what to do when a user hits the index route
@app.route("/")
def read_data():
    data = mongo.db.air_pollution.find({}, {'_id': 0, 'parameter_code': 1, 'POC': 1, 'lat': 1, 'lon': 1,'parameter_name': 1,
                'date_local': 1, 'units_of_measure': 1, 'arithmetic_mean': 1,'first_max_value': 1,
                'AQI': 1,'state_name': 1, 'county_name': 1, 'city_name': 1})
    result = []
    for item in data:
        result.append(item)
    print(jsonify(result))
    return jsonify(result)
    

# 4. Define what to do when a user hits the /about route
@app.route("/test")
def test():
    return 'This is working...This is the test route!'


if __name__ == "__main__":
    app.run(debug=True)

