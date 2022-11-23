import base64
import requests
from github import Github
from pprint import pprint
import json
import datetime
import math


MAXIMUM_LINES_FOR_SMALL_COMMITS=20
MAXIMUM_LINES_FOR_MEDIUM_COMMITS=200
MAXIMUM_LINES_FOR_LARGE_COMMITS=500
# INITIALIZE GITHUB API LIBRARY TEMP ACCESS TOKEN EXPIRES 22/11/22
g = Github()
# repo = g.get_repo("MaxCunningham19/SWENG-SWE-Metric-Calculator")
# statistics=[]

# TESTING AUTH
# username = ''
# token = ''

def getRepo(repo_name):
    return g.get_repo(repo_name)
    
# Returns a list of tuples of the user's name 
# that can be defined in the profile and login name 
def getContributors(repo):
    contributorsList=[]
    contributors=repo.get_contributors()
    for contributor in contributors: 
        contributorsList.append((contributor.name,contributor.login))
    return contributorsList
    

def getOverallData(repo,contributorList):
    # STARGAZERS
    numberOfStars=repo.stargazers_count
    # NUMBER OF BRANCHES
    branches=repo.get_branches()
    bList=list(branches)
    numberOfBranches=len(bList)
    # TOTAL COMMITS IN MAIN
    commits=repo.get_commits()
    totalCommits=commits.totalCount
    # REPO CREATE DATE 
    repoCreateDate=repo.created_at
    # API DATA
    dictionary = {
        "stars":numberOfStars,
        "commits":totalCommits,
        "branches":numberOfBranches,
        "contributors":[],
        "contributor_data":[]
    }
    for contributor in contributorList:
        # CONTRIBUTOR DATA VARIABLES
        individualCommits=linesAdded=linesDeleted=linesChanged=0
        smallCommits=mediumCommits=largeCommits=veryLargeCommits=0
        lastCommitDate=repoCreateDate
        # Adds the comtributor to the contributor list
        dictionary["contributors"].append(contributor[1])
        for commit in commits:
            tmp = requests.get(commit.url)
            # MAY NEED TO RUN THIS INSTEAD OF GET COMMIT URL IF API REQUEST IS AT LIMIT
            # tmp = requests.get(url=commit.url, auth=(username,token))
            data = tmp.json()
            stats = data["stats"]
            # Checks if the author's name matches login name
            # or profile defined name since author name can be either 
            if commit.commit.author.name==contributor[1] or commit.commit.author.name==contributor[0]:
                individualCommits+=1
                linesAdded+=stats["additions"]
                linesDeleted+=stats["deletions"]
                if lastCommitDate < commit.commit.author.date:
                    lastCommitDate=commit.commit.author.date
                if stats["total"] <= MAXIMUM_LINES_FOR_SMALL_COMMITS:
                    smallCommits+=1
                elif stats["total"] <= MAXIMUM_LINES_FOR_MEDIUM_COMMITS:
                    mediumCommits+=1
                elif stats["total"] <= MAXIMUM_LINES_FOR_LARGE_COMMITS:
                    largeCommits+=1
                elif stats["total"] > MAXIMUM_LINES_FOR_LARGE_COMMITS:
                    veryLargeCommits+=1
                # Checks if the current commit is the last one made
                if lastCommitDate < commit.commit.author.date:
                    lastCommitDate=commit.commit.author.date
        # Gets number of weeks since repo creation and users last commit
        numberOfWeeks=math.floor(((lastCommitDate-repoCreateDate).days/7))
        averageCommitsPerWeek= individualCommits/numberOfWeeks
        # Individual user data
        individual={
            "user":contributor[1],
            "total_commits":individualCommits,
            "last_commit_date":lastCommitDate.strftime("%d/%m/%Y"),
            "average_commits_per_week":round(averageCommitsPerWeek,2),
            "total_additions":linesAdded,
            "total_deletions":linesDeleted,
            "small_commits":smallCommits,
            "small_commits_line_of_code":"<="+str(MAXIMUM_LINES_FOR_SMALL_COMMITS),
            "medium_commits":mediumCommits,
            "medium_commits_line_of_code":"<="+str(MAXIMUM_LINES_FOR_MEDIUM_COMMITS),
            "large_commits":largeCommits,
            "large_commits_line_of_code":"<="+str(MAXIMUM_LINES_FOR_LARGE_COMMITS),
            "very_large_commits":veryLargeCommits,
            "very_large_commits_line_of_code":">"+str(MAXIMUM_LINES_FOR_LARGE_COMMITS)
        }
        # Adds each users data
        dictionary["contributor_data"].append(individual)
    # Serializing json
    json_object = json.dumps(dictionary, indent=4)
    outfile = open("githubData.json", "w")
    outfile.write(json_object)
    outfile.close()


# commit.commit.author.date
def main():
    repo=input("Enter a repo")
    repo=getRepo(repo)
    contributors=getContributors(repo)
    getOverallData(repo,contributors)


if __name__=="__main__":
    main()