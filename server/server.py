from http.server import BaseHTTPRequestHandler, HTTPServer
import githubAPICheck as githubAPI
import formatToReact as formatter
import cgi
import json

PORT = 8000

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        ctype, pdict = cgi.parse_header(self.headers.getheader('content-type'))
        # refuse to receive non-json content
        if ctype != 'application/json':
            self.send_response(400)
            self.end_headers()
            return

        # read the message and convert it into a python dictionary
        length = int(self.headers.getheader('content-length'))
        message = json.loads(self.rfile.read(length))

        repo_name = message['repo']
        api_key = message['apikey']

        self.send_response(200)
        self.parse_request()
        self.send_header("Content-type", "application/json")
        self.end_headers()
        self.wfile.write(bytes(formatter.format(githubAPI.get_repo_data(repo_name,api_key))))


if __name__ == "__main__":
    webServer = HTTPServer(('localhost', PORT), MyServer)
    print("Python server running on", PORT)
    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass
    webServer.server_close()
    print("Server stopped.")