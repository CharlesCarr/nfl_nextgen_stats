from flask import Flask
import pandas as pd
import nfl_data_py as nfl
import math

app = Flask(__name__)

# print('test')
# n1 = math.nan
# print(n1)
# print(math.isnan(n1))

# passingDf = nfl.import_ngs_data(stat_type='passing')
# passingList = passingDf.to_dict("records")
# passingTest = [passingList[0], passingList[1]]
# for pass_item in passingTest:
        # print(pass_item)
        # for key in pass_item:
            # print(key)
            # print(pass_item[key])
            # if (pass_item[key] == 'Matt Ryan'):
            #     print(pass_item[key])
            #     pass_item[key] = 'Charlie Ryan'
            #     print(pass_item[key])


@app.route('/passing')
def index():
    # create a variable to store output from a nfl method (testing data)
    passingDf = nfl.import_ngs_data(stat_type='passing')
    # convert from pandas df to list of dictionaries
    passingList = passingDf.to_dict("records")

    # TEST returning one item
    # passingTest = [passingList[0], passingList[1], passingList[2], passingList[3], passingList[4], passingList[5]]

    def isNaN(num):
        return num != num

    # loop over all and if a key returns a val of NaN convert to string of NaN
    for pass_item in passingList:
        for key in pass_item:
            if (isNaN(pass_item[key])):
                # passListTest.append(pass_item[key])
                pass_item[key] = 'NaN'
                
    return {"data": passingList}
