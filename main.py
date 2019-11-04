from bottle import route, run, static_file
import json

@route("/")
def root():
    return static_file("index.html", "./")

@route("/index.js")
def index():
    return static_file("index.js", "./")
run(host="0.0.0.0", port=8080)

@route("/routes/riga")
def routes():
    return static_file("transport.py", "./")