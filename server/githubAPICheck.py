import base64
import requests
from github import Github
from pprint import pprint
import json


def get_repo_data(repo_name):
    MAX_SMALL_COMMIT_LENGTH = 20    # low score
    MAX_MEDIUM_COMMIT_LENGTH = 200  # high score
    MAX_LARGE_COMMIT_LENGTH = 500   # medium score
    MAX_VERY_LARGE_COMMIT_LENGTH = 1000 # low score

    # INITIALIZE GITHUB API LIBRARY TEMP ACCESS TOKEN EXPIRES 22/11/22
    g = Github()
    repo = g.get_repo(repo_name)

    # TESTING AUTH
    # username = ''
    # token = ''

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
        # dictionary[author] = contributor.weeks
        totalAdditions = 0
        totalDeletions = 0
        totalCommits = 0
        for week in contributor.weeks:
            totalAdditions += week.a
            totalDeletions += week.d
            totalCommits += week.c
        # COMPILE DATA
        averageCommitsPerWeek = totalCommits / len(contributor.weeks)
        dictionary[author + "_total_additions"] = totalAdditions
        dictionary[author + "_total_deletions"] = totalDeletions
        dictionary[author + "_total_commits"] = totalCommits
        dictionary[author + "_average_commitsPerWeek"] = averageCommitsPerWeek
        dictionary[author + "_very_many_lines_of_code"] = 0
        dictionary[author + "_very_many_lines_of_code_commits"] = 0
        dictionary[author + "_many_lines_of_code"] = 0
        dictionary[author + "_many_lines_of_code"] = 0
        dictionary[author + "_average_lines_of_code"] = 0
        dictionary[author + "_average_lines_of_code_commits"] = 0
        dictionary[author + "_few_lines_of_code"] = 0
        dictionary[author + "_few_lines_of_code_commits"] = 0

    # QUALITY COMMITS CHECK
    # get quality lines of code then add additional commited quality lines
    for commit in commits:
        linesCommitted = commit.stats.additions
        author = commit.author.login

        if (linesCommitted <= MAX_SMALL_COMMIT_LENGTH):
            linesOfCode = dictionary.get(author + "_few_lines_of_code")
            linesOfCodeCommits = dictionary.get(author + "_few_lines_of_code_commits")
            linesOfCode += linesCommitted
            linesOfCodeCommits += 1
            dictionary[author + "_few_lines_of_code"] = linesOfCode
            dictionary[author + "_few_lines_of_code_commits"] = linesOfCodeCommits

        elif (linesCommitted <= MAX_MEDIUM_COMMIT_LENGTH):
            linesOfCode = dictionary.get(author + "_average_lines_of_code")
            linesOfCodeCommits = dictionary.get(author + "_average_lines_of_code_commits")
            linesOfCode += linesCommitted
            linesOfCodeCommits += 1
            dictionary[author + "_average_lines_of_code"] = linesOfCode
            dictionary[author + "_average_lines_of_code_commits"] = linesOfCodeCommits

        elif (linesCommitted <= MAX_LARGE_COMMIT_LENGTH):
            linesOfCode = dictionary.get(author + "_many_lines_of_code")
            linesOfCodeCommits = dictionary.get(author + "_many_lines_of_code_commits")
            linesOfCode += linesCommitted
            linesOfCodeCommits += 1
            dictionary[author + "_many_lines_of_code"] = linesOfCode
            dictionary[author + "_many_lines_of_code_commits"] = linesOfCodeCommits
        elif (linesCommitted > MAX_LARGE_COMMIT_LENGTH):
            linesOfCode = dictionary.get(author + "_very_many_lines_of_code")
            linesOfCodeCommits = dictionary.get(author + "_very_many_lines_of_code_commits")
            linesOfCode += linesCommitted
            linesOfCodeCommits += 1
            dictionary[author + "_very_many_lines_of_code"] = linesOfCode
            dictionary[author + "_very_many_lines_of_code_commits"] = linesOfCodeCommits

    # print("Mcommits " + str(mcommits) + " Fcommits " + str(fcommits))

    # Serializing json
    json_object = json.dumps(dictionary, indent=4)

    # Writing to sample.json
    with open("githubData.json", "w") as outfile:
        outfile.write(json_object)


repo_name = "MaxCunningham19/SWENG-SWE-Metric-Calculator"
get_repo_data(repo_name)