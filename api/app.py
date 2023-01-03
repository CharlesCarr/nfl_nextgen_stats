from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import nfl_data_py as nfl

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return jsonify({"Status": "Flask App is Online"})

@app.route('/passing')
def passing():
    # create a variable to store output from a nfl method (testing data)
    passingDf = nfl.import_ngs_data(stat_type='passing')
    # convert from pandas df to list of dictionaries
    passingList = passingDf.to_dict("records")

    def isNaN(num):
        return num != num

    # loop over all and if a key returns a val of NaN convert to string of NaN
    for pass_item in passingList:
        for key in pass_item:
            if (isNaN(pass_item[key])):
                # passListTest.append(pass_item[key])
                pass_item[key] = 'NaN'
                
    return {"data": passingList}

@app.route('/rushing')
def rushing():
    # create a variable to store output from a nfl method (testing data)
    rushingDf = nfl.import_ngs_data(stat_type='rushing')
    # convert from pandas df to list of dictionaries
    rushingList = rushingDf.to_dict("records")
    # print(rushingDf)

    def isNaN(num):
        return num != num

    # loop over all and if a key returns a val of NaN convert to string of NaN
    for rush_item in rushingList:
        for key in rush_item:
            if (isNaN(rush_item[key])):
                # passListTest.append(pass_item[key])
                rush_item[key] = 'NaN'
     
    return {"data": rushingList}

# rushing()
