from flask import Flask  
from flask import render_template
from flask import jsonify

app = Flask(__name__)

# init horse place on first load
@app.route("/")
def hello():  
    data = "Hello, World"
    return render_template('index.html', data=data)

# get all horse movement allowed api	
@app.route('/horse/<arg>')
def get(arg):
 L = list(arg)
 x = int(L[0]) 
 y = int(L[1]) 
 coords = [[x+2, y+1],[x+2, y-1],[x+1, y+2],[x-1, y+2],[x+1, y-2],[x-1, y-2],[x-2, y-1],[x-2, y+1]]
 return jsonify([item for item in coords if 0 <= item[0] <= 7 and 0 <= item[1] <= 7])
  
# run the application
if __name__ == "__main__":  
    app.run(host='0.0.0.0',debug=True,port=8080)