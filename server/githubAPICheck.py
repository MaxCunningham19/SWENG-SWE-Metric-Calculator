import requests
from github import Github
##from flask import Flask
##from flask_restful import Resource, Api, reqparse
import json
import math

##app = Flask(__name__)
##api = Api(app)

# GETS REPO DATA REQUIRES NAME AND ACCESS TOKEN


##class Users(Resource):
##    def get(self):
##        repo_name = "MaxCunningham19/SWENG-SWE-Metric-Calculator"
##        token = "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"
##        data = get_repo_data(repo_name, token)
##        return data


##api.add_resource(Users, '/users')


def get_repo_data(repo_name: str, access_token: str) -> str | None:
    """Given a repository name and a valid personal access token, return the data for the repository
        as a JSON-formatted string.
        - -
        Parameters:
            - `repo_name`: the name of the repository, formatted 'username/repo name' 
            - `access_token`: a valid personal access token from any user
        - -
        Returns: 
            - `str`: a JSON-formatted string containing information about the chosen repository if successful, or
            - `None`: if an exception occurs at any point
    """

    MAX_SMALL_COMMIT_LENGTH = 20    # low score
    MAX_MEDIUM_COMMIT_LENGTH = 200  # high score
    MAX_LARGE_COMMIT_LENGTH = 500   # medium score

    try:
        # INITIALIZE GITHUB API LIBRARY TEMP ACCESS TOKEN EXPIRES 22/11/22
        g = Github(access_token)
        repo = g.get_repo(repo_name)
        createdAt = repo.created_at
        # TEST CHECK FOR NUMBER OF STARS
        numberOfStars = repo.stargazers_count

        # GET GENERAL DATA
        commits = repo.get_commits()
        numberOfCommits = commits.totalCount

        bList = list(repo.get_branches())
        numberOfBranches = len(bList)

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
            dict["total_additions"] = 0  # totalAdditions
            dict["total_deletions"] = 0  # totalDeletions
            dict["total_commits"] = 0  # totalCommits
            dict["average_commitsPerWeek"] = 0  # averageCommitsPerWeek
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

        lastCommitDate = createdAt

        # QUALITY COMMITS CHECK
        # get quality lines of code then add additional commited quality lines
        for commit in commits:
            linesCommitted = commit.stats.additions
            additions = commit.stats.additions
            deletions = commit.stats.deletions
            author = commit.author.login
            for dict in dictionary.get("contributor_data"):
                if (dict.get("user") == author):
                    if (linesCommitted <= MAX_SMALL_COMMIT_LENGTH):
                        linesOfCode = dict.get("few_lines_of_code")
                        linesOfCodeCommits = dict.get(
                            "few_lines_of_code_commits")
                        totalAdditions = dict.get("total_additions")
                        totalDeletions = dict.get("total_deletions")
                        totalCommits = dict.get("total_commits")
                        totalAdditions += additions
                        totalDeletions += deletions

                        totalCommits += 1
                        linesOfCode += linesCommitted
                        linesOfCodeCommits += 1
                        dict["total_additions"] = totalAdditions
                        dict["total_deletions"] = totalDeletions
                        dict["total_commits"] = totalCommits
                        dict["few_lines_of_code"] = linesOfCode
                        dict["few_lines_of_code_commits"] = linesOfCodeCommits

                    elif (linesCommitted <= MAX_MEDIUM_COMMIT_LENGTH):
                        linesOfCode = dict.get("average_lines_of_code")
                        linesOfCodeCommits = dict.get(
                            "average_lines_of_code_commits")
                        totalAdditions = dict.get("total_additions")
                        totalDeletions = dict.get("total_deletions")
                        totalCommits = dict.get("total_commits")
                        totalAdditions += additions
                        totalDeletions += deletions

                        totalCommits += 1
                        linesOfCode += linesCommitted
                        linesOfCodeCommits += 1
                        dict["total_additions"] = totalAdditions
                        dict["total_deletions"] = totalDeletions
                        dict["total_commits"] = totalCommits
                        dict["average_lines_of_code"] = linesOfCode
                        dict["average_lines_of_code_commits"] = linesOfCodeCommits

                    elif (linesCommitted <= MAX_LARGE_COMMIT_LENGTH):
                        linesOfCode = dict.get("many_lines_of_code")
                        linesOfCodeCommits = dict.get(
                            "many_lines_of_code_commits")
                        totalAdditions = dict.get("total_additions")
                        totalDeletions = dict.get("total_deletions")
                        totalCommits = dict.get("total_commits")
                        totalAdditions += additions
                        totalDeletions += deletions

                        totalCommits += 1
                        linesOfCode += linesCommitted
                        linesOfCodeCommits += 1

                        dict["total_additions"] = totalAdditions
                        dict["total_deletions"] = totalDeletions
                        dict["total_commits"] = totalCommits
                        dict["many_lines_of_code"] = linesOfCode
                        dict["many_lines_of_code_commits"] = linesOfCodeCommits
                    elif (linesCommitted > MAX_LARGE_COMMIT_LENGTH):
                        linesOfCode = dict.get("very_many_lines_of_code")
                        linesOfCodeCommits = dict.get(
                            "very_many_lines_of_code_commits")
                        totalAdditions = dict.get("total_additions")
                        totalDeletions = dict.get("total_deletions")
                        totalCommits = dict.get("total_commits")
                        totalAdditions += additions
                        totalDeletions += deletions

                        totalCommits += 1
                        linesOfCode += linesCommitted
                        linesOfCodeCommits += 1
                        dict["total_additions"] = totalAdditions
                        dict["total_deletions"] = totalDeletions
                        dict["total_commits"] = totalCommits
                        dict["very_many_lines_of_code"] = linesOfCode
                        dict["very_many_lines_of_code_commits"] = linesOfCodeCommits

            # New Average Commits formula
            # YET TO BE IMPLEMENTED IN LOOP, ONLY CALCULATES FOR LAST USER
            if commit.commit.author.date > lastCommitDate:
                lastCommitDate = commit.commit.author.date
        weeks = math.floor((lastCommitDate-createdAt).days/7)
        if weeks == 0:
            weeks = 1
        averageCommitsPerWeek = totalCommits/weeks
        dict["average_commitsPerWeek"] = averageCommitsPerWeek

        # Serializing json
        json_object = json.dumps(dictionary, indent=4)

        # DEBUG WRITE TO JSON FILE
        # with open("githubData.json", "w") as outfile:
        #   outfile.write(json_object)
        ##print("Data Written to JSON")
        return json_object

    except Exception as e:
        print(e)
        print("\nError Writing to JSON")
        return None


##if __name__ == "__main__":
  ##  app.run(debug=True)