import json


def format(file_name: str):
    """
    Returns the given JSON file in a format suitable for React.js.
    * `file_name`: the name of the JSON file to format
    * Returns: the formatted file as a string
    """
    
    json_file = open(file_name)
    json_data = json.load(json_file)
    data: list = json_data["contributor_data"] # list of user data as dictionaries

    # universal data
    data.append(
        {
            'stars': json_data['stars'],
            'total_commits_to_main': json_data['total_commits_to_main'],
            'total_branches': json_data['total_branches']
        }
    )

    return json.dumps(data, indent=4)

# write data to a file named 'newData.json'. 
# with open('newData.json', 'w') as f:
#     f.write(format("githubData.json"))

