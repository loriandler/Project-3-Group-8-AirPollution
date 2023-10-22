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

    # Carbon Monoxide Data only
    carbonMoData = mongo.db.air_pollution.find({"parameter_name": "Carbon monoxide"}, {'_id': 0, 'parameter_code': 1, 'POC': 1, 'lat': 1, 'lon': 1,'parameter_name': 1,
                'date_local': 1, 'units_of_measure': 1, 'arithmetic_mean': 1,'first_max_value': 1,
                'AQI': 1,'state_name': 1, 'county_name': 1, 'city_name': 1}) # will through this "TypeError: Object of type ObjectId is not JSON serializable" if I don't list out all the columns I want. Not sure why.

    carbonMoDataList = []
    for item in carbonMoData:
         carbonMoDataList.append(item)


    # Get a list/array of the unique chemical/pollutant (for the dropdown list)
    uniquePollutantsData = mongo.db.air_pollution.aggregate([
  {
    "$group": {
      "_id": "$parameter_name",
    },
  },
 ])

    uniquePollutantsJson = []
    for item in uniquePollutantsData:
         uniquePollutantsJson.append(item)

    uniquePollutantsList = [ sub['_id'] for sub in uniquePollutantsJson ] #https://www.geeksforgeeks.org/python-get-values-of-particular-key-in-list-of-dictionaries/



    # print(jsonify(result))
    # return jsonify(result)
    # return jsonify(carbonMoDataList)
    # return jsonify(uniquePollutantsList)
    return render_template('index.html', data1=result, data2=carbonMoDataList, data3=uniquePollutantsList)

@app.route("/map")
def ozoneMap():
    mapData = mongo.db.air_pollution.find({}, {'_id': 0, 'parameter_code': 1, 'POC': 1, 'lat': 1, 'lon': 1,'parameter_name': 1,
                'date_local': 1, 'units_of_measure': 1, 'arithmetic_mean': 1,'first_max_value': 1,
                'AQI': 1,'state_name': 1, 'county_name': 1, 'city_name': 1})
    mapResult = []
    for item in mapData:
        mapResult.append(item)
    
    # return jsonify(mapResult)
    return render_template('index2.html', mData=mapResult)


if __name__ == "__main__":
    app.run(debug=True)

