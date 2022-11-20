import csv
from github import Github
import datetime


def export_code_frequency(directory, authToken):

    g = Github(authToken)
    repo = g.get_repo("MaxCunningham19/SWENG-SWE-Metric-Calculator")
    today = str(datetime.date.today())
    today = today.replace("-", "")

    print("Exporting code frequency for repo: " + repo.name)
    codefreq = repo.get_stats_code_frequency()
    with open(directory + "/" + repo.name + today + ".csv", "w", encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile, delimiter=',')
        writer.writerow(["timestamp", "additions",
                        "deletions", "commits", "author"])
        for row in codefreq:
            writer.writerow(row)

    print("Exported code frequency for repo:" + repo.name)

    stats = repo.get_stats_contributors()
    for stat in stats:
        author = str(stat.author)
        author = (author.replace('NamedUser(login="', "")).replace('")', "")
        for week in stat.weeks:
            if week.c != 0:
                date = str(week.w)
                date = date[:10]
                writer.writerow(
                    [repo.name, date, week.a, week.d, week.c, author])
                try:
                    writer.writerow(
                        [repo.name, date, week.a, week.d, week.c, author,
                            "yes"])
                except:
                    print("error")
            else:
                controws += 1
                try:
                    writer.writerow(
                        [repo.name, date, week.a, week.d, week.c, author,
                            "no"])
                except:
                    print("error2")
            print("[", str(1).zfill(2), "|" "] ", " | ",
                  repo.name,  " | ", controws, " rows in the file")


if __name__ == "__main__":
    export_code_frequency(
        "/Users/maxcunningham/Desktop/CodeFrequency", "token")
