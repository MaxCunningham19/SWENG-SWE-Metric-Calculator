import base64
import requests
from github import Github
from pprint import pprint
import json



def get_repo_data(repo_name):
    MAXIMUM_QUALTIY_COMMIT_LENGTH = 500

    # INITIALIZE GITHUB API LIBRARY TEMP ACCESS TOKEN EXPIRES 22/11/22
    g = Github()
    repo = g.get_repo(repo_name)

    # TESTING AUTH
    #username = ''
    #token = ''

    # TEST CHECK FOR NUMBER OF STARS
    numberOfStars = repo.stargazers_count

    # GET GENERAL DATA
    commits = repo.get_commits()
    numberOfCommits = commits.totalCount

    bList = list(repo.get_branches())
    numberOfBranches = len(bList)
    numberOfCommits = 0

    # USER DATA
    # Data to be written
    dictionary = {
        "stars": numberOfStars,
        "total_commits_to_main": numberOfCommits,
        "total_branches": numberOfBranches,

    }


    rstats = repo.get_stats_contributors()
    for contributor in rstats:
        author = contributor.author.login
        #dictionary[author] = contributor.weeks
        totalAdditions = 0
        totalDeletions = 0
        totalCommits = 0
        for week in contributor.weeks:
            totalAdditions += week.a
            totalDeletions += week.d
            totalCommits += week.c
        # COMPILE DATA
        averageCommitsPerWeek = totalCommits / len(contributor.weeks)
        dictionary[author+"_total_additions"] = totalAdditions
        dictionary[author + "_total_deletions"] = totalDeletions
        dictionary[author + "_total_commits"] = totalCommits
        dictionary[author + "_average_commitsPerWeek"] = averageCommitsPerWeek
        dictionary[author + "_quality_lines_of_code"] = 0

    # QUALITY COMMITS CHECK
    # get quality lines of code then add additional commited quality lines
    for commit in commits:
        linesCommitted = commit.stats.additions
        author = commit.author.login
        qualityLinesOfCode = dictionary.get(author + "_quality_lines_of_code")
        if(linesCommitted <= MAXIMUM_QUALTIY_COMMIT_LENGTH):
            qualityLinesOfCode += linesCommitted
        dictionary[author + "_quality_lines_of_code"] = qualityLinesOfCode

    # print("Mcommits " + str(mcommits) + " Fcommits " + str(fcommits))



    # Serializing json
    json_object = json.dumps(dictionary, indent=4)

    # Writing to sample.json
    with open("githubData.json", "w") as outfile:
        outfile.write(json_object)

repo_name = "MaxCunningham19/SWENG-SWE-Metric-Calculator"
get_repo_data(repo_name)