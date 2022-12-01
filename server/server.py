import sys
import githubAPICheck as githubAPI
import formatToReact as formatter


repo_name = sys.argv[1]
api_key = sys.argv[2]
output_string = githubAPI.get_repo_data(repo_name,api_key)

print(output_string)
try:
    sys.stdout.flush()
except:
    print('error')
