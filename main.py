from bottle import route, run, static_file
import json
import csv
import transport

@route("/")
def root():
    return static_file("index.html", "./")

@route("/index.js")
def index():
    return static_file("index.js", "./")


@route("/routes/riga")
def data():
    return transport.getStopData("riga_bus_1_a-b")

run(host="0.0.0.0", port=8080)