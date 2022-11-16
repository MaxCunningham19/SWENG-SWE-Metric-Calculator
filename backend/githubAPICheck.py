import base64
# import requests
from github import Github
from pprint import pprint
import json
# INITIALIZE GITHUB API LIBRARY TEMP ACCESS TOKEN EXPIRES 22/11/22
g = Github()
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

bcommits = 0
bmerges = 0

# GET COMMIT DATA
commits = repo.get_commits()
numberOfCommits = commits.totalCount
# for commit in commits:
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
            case "bairdr":
                bcommits += 1
            case default:
                print("Error unassigned commit")

# print("Mcommits " + str(mcommits) + " Fcommits " + str(fcommits))

# GET BRANCH DATA
branches = repo.get_branches()
numberOfBranches = branches.totalCount

# GET MERGE DATA
# pulls = repo.get_pulls()
# numberOfPulls = pulls.totalCount
# for pull in pulls:
#    print("test")

# Data to be written
dictionary = {
    "total_commits": numberOfCommits,
    "total_branches": numberOfBranches,
    "declan_username": "declanquinn00",
    "declan_commits": dcommits,
    "declan_merges": dmerges,

    "max_username": "Max Cunningham",
    "max_commits": mcommits,
    "max_merges": mmerges,

    "ryan_username": "francsir",
    "ryan_commits": fcommits,
    "ryan_merges": fmerges,

    "baird_username": "bairdr",
    "baird_commits": bcommits,
    "baird_merges": bmerges,
}

# Serializing json
json_object = json.dumps(dictionary, indent=4)

# Writing to sample.json
with open("githubData.json", "w") as outfile:
    outfile.write(json_object)
