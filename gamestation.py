from flask import Flask, request,jsonify,send_file,render_template
import pandas as pd
from flask_cors import CORS
from datetime import datetime


app = Flask(__name__) 
app.secret_key = 'keep it secret, keep it safe'   
cors = CORS(app, resources={r"/*": {"origins": "*"}})



@app.route('/rest/hardware/query/<startDate>/<endDate>')
def searchHardwareByDate(startDate,endDate):
    """" search date from startDate to endDate """
    df = pd.read_csv("./HARDWARE.csv",parse_dates=['TIME_PERIOD'])
    df.sort_values(by='TIME_PERIOD',inplace=True)

    # startDate=datetime.datetime.strptime(date_string, format1).strftime(format2)

    query=df[(df['TIME_PERIOD']>=startDate) & (df['TIME_PERIOD']<=endDate)]

    return query.to_json(orient='records',date_format='iso'),200

@app.route("/login/<username>/<password>" )
def login(username,password):


    if(username!='alex'):
        return jsonify({"info":"ok","result":True}),200
    else:
        return jsonify({"info":"password incorrect","result":False}),500



@app.route("/")
def index():
    return render_template("./angular-tour-of-heroes/index.html")

if __name__=="__main__":
    app.run(debug=True, port=9090)