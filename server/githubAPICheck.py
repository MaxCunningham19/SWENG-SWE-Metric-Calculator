import requests
from github import Github
import json


# GETS REPO DATA REQUIRES NAME AND ACCESS TOKEN
def get_repo_data(repo_name, access_token):
    MAX_SMALL_COMMIT_LENGTH = 20    # low score
    MAX_MEDIUM_COMMIT_LENGTH = 200  # high score
    MAX_LARGE_COMMIT_LENGTH = 500   # medium score

    try:
        # INITIALIZE GITHUB API LIBRARY TEMP ACCESS TOKEN EXPIRES 22/11/22
        g = Github(access_token)
        repo = g.get_repo(repo_name)

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
        contributors = list()
        contributorData = list()
        for contributor in rstats:
            author = contributor.author.login
            contributors.append(author)
            dict = {
                "user": author
            }

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
            dictionary["contributors"] = contributors
            dict["total_additions"] = totalAdditions
            dict["total_deletions"] = totalDeletions
            dict["total_commits"] = totalCommits
            dict["average_commitsPerWeek"] = averageCommitsPerWeek
            dict["very_many_lines_of_code"] = 0
            dict["very_many_lines_of_code_commits"] = 0
            dict["many_lines_of_code"] = 0
            dict["many_lines_of_code_commits"] = 0
            dict["average_lines_of_code"] = 0
            dict["average_lines_of_code_commits"] = 0
            dict["few_lines_of_code"] = 0
            dict["few_lines_of_code_commits"] = 0
            contributorData.append(dict)

        dictionary["contributor_data"] = contributorData


        # QUALITY COMMITS CHECK
        # get quality lines of code then add additional commited quality lines
        for commit in commits:
            linesCommitted = commit.stats.additions
            author = commit.author.login
            for dict in dictionary.get("contributor_data"):
                if(dict.get("user") == author):
                    if (linesCommitted <= MAX_SMALL_COMMIT_LENGTH):
                        linesOfCode = dict.get("few_lines_of_code")
                        linesOfCodeCommits = dict.get("few_lines_of_code_commits")
                        linesOfCode += linesCommitted
                        linesOfCodeCommits += 1
                        dict["few_lines_of_code"] = linesOfCode
                        dict["few_lines_of_code_commits"] = linesOfCodeCommits

                    elif (linesCommitted <= MAX_MEDIUM_COMMIT_LENGTH):
                        linesOfCode = dict.get("average_lines_of_code")
                        linesOfCodeCommits = dict.get("average_lines_of_code_commits")
                        linesOfCode += linesCommitted
                        linesOfCodeCommits += 1
                        dict["average_lines_of_code"] = linesOfCode
                        dict["average_lines_of_code_commits"] = linesOfCodeCommits

                    elif (linesCommitted <= MAX_LARGE_COMMIT_LENGTH):
                        linesOfCode = dict.get("many_lines_of_code")
                        linesOfCodeCommits = dict.get("many_lines_of_code_commits")
                        linesOfCode += linesCommitted
                        linesOfCodeCommits += 1
                        dict["many_lines_of_code"] = linesOfCode
                        dict["many_lines_of_code_commits"] = linesOfCodeCommits
                    elif (linesCommitted > MAX_LARGE_COMMIT_LENGTH):
                        linesOfCode = dict.get("very_many_lines_of_code")
                        linesOfCodeCommits = dict.get("very_many_lines_of_code_commits")
                        linesOfCode += linesCommitted
                        linesOfCodeCommits += 1
                        dict["very_many_lines_of_code"] = linesOfCode
                        dict["very_many_lines_of_code_commits"] = linesOfCodeCommits


        # Serializing json
        json_object = json.dumps(dictionary, indent=4)

        # DEBUG WRITE TO JSON FILE
        # with open("githubData.json", "w") as outfile:
        #    outfile.write(json_object)
        print("Data Written to JSON")
        return json_object

    except Exception as e:
        print(e)
        print("\nError Writing to JSON")
        return None



repo_name = "MaxCunningham19/SWENG-SWE-Metric-Calculator"
get_repo_data(repo_name, "my_personal_access_token") # ! MUST BE VALID PERSONAL ACCESS TOKEN