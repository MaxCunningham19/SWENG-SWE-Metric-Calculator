import base64
# import requests
from github import Github
from pprint import pprint
import json
# INITIALIZE GITHUB API LIBRARY TEMP ACCESS TOKEN EXPIRES 22/11/22
g = Github("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")
repo = g.get_repo("MaxCunningham19/SWENG-SWE-Metric-Calculator")
# TEST CHECK FOR NUMBER OF STARS SHOULD RETURN 1
print(repo.stargazers_count)

# repository_commit_date = repo.get_commit(sha='main')
# stats_ = repository_commit_date.stats
# print(stats_.total)

dcommits = 0
dmerges = 0

mcommits = 0
mmerges = 0

fcommits = 0
fmerges = 0

# GET COMMIT DATA
commits = repo.get_commits()
numberOfCommits = commits.totalCount
#for commit in commits:
#    if commit.commit is not None:
#        print(commit.commit.author)

for commit in commits:
    if commit.commit is not None:
        match commit.commit.author.name:
            case "Max Cunningham":
                mcommits += 1
            case "francsir":
                fcommits += 1
            case "declanquinn00":
                dcommits += 1
            case default:
                print("Error unassigned commit")

#print("Mcommits " + str(mcommits) + " Fcommits " + str(fcommits))

# GET BRANCH DATA
branches = repo.get_branches()
numberOfBranches = branches.totalCount

# GET MERGE DATA
#pulls = repo.get_pulls()
#numberOfPulls = pulls.totalCount
#for pull in pulls:
#    print("test")

# Data to be written
dictionary = {
    "total commits": numberOfCommits,
    "total branches": numberOfBranches,
    "declan username": "declanquinn00",
    "declan commits": dcommits,
    "declan merges": dmerges,

    "max username": "Max Cunningham",
    "max commits": mcommits,
    "max merges": mmerges,

    "ryan username": "francsir",
    "ryan commits": fcommits,
    "ryan merges": fmerges,
}

# Serializing json
json_object = json.dumps(dictionary, indent=4)

# Writing to sample.json
with open("githubData.json", "w") as outfile:
    outfile.write(json_object)