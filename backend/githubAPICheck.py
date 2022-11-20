import base64
import requests
from github import Github
from pprint import pprint
import json
# INITIALIZE GITHUB API LIBRARY TEMP ACCESS TOKEN EXPIRES 22/11/22
g = Github()
repo = g.get_repo("MaxCunningham19/SWENG-SWE-Metric-Calculator")

# TESTING AUTH
#username = ''
#token = ''

# TEST CHECK FOR NUMBER OF STARS SHOULD RETURN 1
numberOfStars = repo.stargazers_count

dCommits = 0
dLinesOfCodeAdded = 0
dLinesOfCodeDeleted = 0
dMerges = 0

mCommits = 0
mLinesOfCodeAdded = 0
mLinesOfCodeDeleted = 0
mMerges = 0

fCommits = 0
fLinesOfCodeAdded = 0
fLinesOfCodeDeleted = 0
fMerges = 0

bCommits = 0
bLinesOfCodeAdded = 0
bLinesOfCodeDeleted = 0
bMerges = 0

wCommits = 0
wLinesOfCodeAdded = 0
wLinesOfCodeDeleted = 0
wMerges = 0

aCommits = 0
aLinesOfCodeAdded = 0
aLinesOfCodeDeleted = 0
aMerges = 0

gCommits = 0
gLinesOfCodeAdded = 0
gLinesOfCodeDeleted = 0
gMerges = 0

cCommits = 0
cLinesOfCodeAdded = 0
cLinesOfCodeDeleted = 0
cMerges = 0

# GET COMMIT DATA
bList = list(repo.get_branches())
numberOfBranches = len(bList)
numberOfCommits = 0
for branch in bList:
    commits = repo.get_commits(branch.name)
    if(branch.name == "main"):
        commitsToMain = commits.totalCount
    else:
        numberOfCommits += commits.totalCount
        #for commit in commits:
        #   if commit.commit is not None:
        #       print(commit.commit.author)

        for commit in commits:
            # MAY NEED TO RUN THIS INSTEAD OF GET COMMIY URL IF API REQUEST IS AT LIMIT
            #tmp = requests.get(url=commit.url, auth=(username,token))
            tmp = requests.get(commit.url)
            data = tmp.json()
            stats = data["stats"]
            if commit.commit is not None:
                match commit.commit.author.name:
                    case "Max Cunningham":
                        mCommits += 1
                        mLinesOfCodeAdded += stats["additions"]
                        mLinesOfCodeDeleted += stats["deletions"]
                    case "francsir":
                        fCommits += 1
                        fLinesOfCodeAdded += stats["additions"]
                        fLinesOfCodeDeleted += stats["deletions"]
                    case "declanquinn00":
                        dCommits += 1
                        dLinesOfCodeAdded += stats["additions"]
                        dLinesOfCodeDeleted += stats["deletions"]
                    case "bairdr":
                        bCommits += 1
                        bLinesOfCodeAdded += stats["additions"]
                        bLinesOfCodeDeleted += stats["deletions"]
                    case "Wiktoria Fabijaniak":
                        wCommits += 1
                        wLinesOfCodeAdded += stats["additions"]
                        wLinesOfCodeDeleted += stats["deletions"]
                    case "AAjayiB":
                        aCommits += 1
                        aLinesOfCodeAdded += stats["additions"]
                        aLinesOfCodeDeleted += stats["deletions"]
                    case "aislinggallagher":
                        gCommits += 1
                        gLinesOfCodeAdded += stats["additions"]
                        gLinesOfCodeDeleted += stats["deletions"]
                    case "okaforc":
                        cCommits += 1
                        cLinesOfCodeAdded += stats["additions"]
                        cLinesOfCodeDeleted += stats["deletions"]
                    case default:
                        print("Error unassigned commit")

# print("Mcommits " + str(mcommits) + " Fcommits " + str(fcommits))

# Data to be written
dictionary = {
    "stars" : numberOfStars,
    "total_commits": numberOfCommits,
    "commits_to_main": commitsToMain,
    "total_branches": numberOfBranches,
    "declan_username": "declanquinn00",
    "declan_commits": dCommits,
    "declan_merges": dMerges,

    "max_username": "Max Cunningham",
    "max_commits": mCommits,
    "max_lines_added": mLinesOfCodeAdded,
    "max_lines_deleted": mLinesOfCodeDeleted,
    "max_merges": mMerges,

    "ryan_username": "francsir",
    "ryan_lines_added": fLinesOfCodeAdded,
    "ryan_lines_deleted": fLinesOfCodeDeleted,
    "ryan_commits": fCommits,
    "ryan_merges": fMerges,

    "baird_username": "bairdr",
    "baird_lines_added": bLinesOfCodeAdded,
    "baird_lines_deleted": bLinesOfCodeDeleted,
    "baird_commits": bCommits,
    "baird_merges": bMerges,

    "wiktoria_username": "Wiktoria Fabijaniak",
    "wiktoria_lines_added": wLinesOfCodeAdded,
    "wiktoria_lines_deleted": wLinesOfCodeDeleted,
    "wiktoria_commits": wCommits,
    "wiktoria_merges": wMerges,

    "ameen_username": "AAjayiB",
    "ameen_lines_added": aLinesOfCodeAdded,
    "ameen_lines_deleted": aLinesOfCodeDeleted,
    "ameen_commits": aCommits,
    "ameen_merges": aMerges,

    "aisling_username": "aislinggallagher",
    "aisling_lines_added": gLinesOfCodeAdded,
    "aisling_lines_deleted": gLinesOfCodeDeleted,
    "aisling_commits": gCommits,
    "aisling_merges": gMerges,

    "c_username": "okaforc",
    "c_lines_added": cLinesOfCodeAdded,
    "c_lines_deleted": cLinesOfCodeDeleted,
    "c_commits": cCommits,
    "c_merges": cMerges,
}

# Serializing json
json_object = json.dumps(dictionary, indent=4)

# Writing to sample.json
with open("githubData.json", "w") as outfile:
    outfile.write(json_object)