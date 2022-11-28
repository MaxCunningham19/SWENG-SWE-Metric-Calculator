from http.server import BaseHTTPRequestHandler, HTTPServer
import githubAPICheck as githubAPI
import formatToReact as formatter
# import cgi
# import json

PORT = 8000

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        # print(self.headers)
        # ctype, _ = cgi.parse_header(self.headers.get('content-type'))
        # print(self.path)
        # refuse to receive non-json content
        # if ctype != 'application/json':
            # return

        # self.send_response(200)
        # self.send_header("Content-type", "application/json")
        # self.end_headers()
        # read the message and convert it into a python dictionary
        # length = int(self.headers.get('content-length'))
        # message = json.loads(self.rfile.read(length))

        repo_name = 'MaxCunningham19/SWENG-SWE-Metric-Calculator'
        api_key = '' # ! MUST BE VALID PERSONAL ACCESS TOKEN, WILL NOT WORK OTHERWISE
        output_string = formatter.format_data(githubAPI.get_repo_data(repo_name,api_key))

        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()
        self.wfile.write(str.encode(output_string))


if __name__ == "__main__":
    webServer = HTTPServer(('localhost', PORT), MyServer)
    print("Python server running on", PORT)
    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass
    webServer.server_close()
    print("Server stopped.")