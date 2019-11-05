import csv
import json

def getStopData(id):
    with open("routes/shapes.txt") as file:
        info = csv.reader(file)
        stopData = []
        for line in info:
            if line[0] == id:
                stopData.append([float(line[1]), float(line[2]), "Stop " + str(line[3])])
        data = json.dumps(stopData)
        return data