import pandas as pd
import nfl_data_py as nfl

pd.set_option('display.max_columns', None)

df = nfl.import_ngs_data(stat_type='passing')
print(df)