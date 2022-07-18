import random

inFile = open("final_test.csv", "r")
outFile = open("final_out.csv", "w")

lines = inFile.read().splitlines()
inFile.close()

header = lines.pop(0)
outFile.write(header+",Results\n")

maxGuesses = max(map(lambda line : int(line.split(",")[1]),lines))

for line in lines:
  (name, guess, score) = line.split(",")
  runningScore = float(score)
  rolls = [name, guess, score]
  for i in range(maxGuesses):
    if i < int(guess):
      if random.random() < 0.5:
        runningScore *= 3
      else:
        runningScore = 0
    rolls.append(str(runningScore))
  print(rolls)
  outFile.write(",".join(rolls)+"\n")