from http.server import BaseHTTPRequestHandler, HTTPServer
import sys
import githubAPICheck as githubAPI
import formatToReact as formatter

text_file = open('.\\accessToken', 'r')
api_key = text_file.read()
text_file.close

repo_name = 'MaxCunningham19/SWENG-SWE-Metric-Calculator'
output_string = githubAPI.get_repo_data(repo_name,api_key)

print(output_string)
sys.stdout.flush
