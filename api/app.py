import nfl_data_py as nfl

# print(nfl)

# create a variable to store output from a nfl method (testing data)
testData = nfl.import_ngs_data(stat_type='passing')
# testData = nfl.see_pbp_cols()

# print the variable to see that it is working
print(testData)
