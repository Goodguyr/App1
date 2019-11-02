import csv
def getStopData(id):
    with open("shapes.txt") as file:
        info = csv.reader(file)
        stopData = {}
        for line in info:
            if line[0] == id:
                stopData[id] = [float(line[1]), float(line[2]), "Stop " + str(line[3])]
        return stopData