import json

def format_name(file_name: str):
    """
    Parses the given JSON name and returns a JSON string in a format suitable for React.js.
    
    - -
    Parameters:
    - `file_name`: the name of the JSON file to format
    - -
    Returns: 
    - `str`: the formatted file as a string
    """

    json_file = open(file_name)
    json_data = json.load(json_file)
    return format_data(json_data)


def format_data(json_data):
    """
    Formats and returns the given JSON file in a format suitable for React.js.

    - -
    Parameters:
    - `json_data`: the JSON object
    - -
    Returns: 
    - the formatted file as a string
    """

    # githubAPICheck returns a json.dumps string, so this loads it
    # it otherwise remains a JSON object
    if type(json_data) == str:
        json_data = json.loads(json_data)

    data = [{}]

    # if the field is a list of dictionaries, add the dictionaries within the list
    # otherwise, add the field to a separate dictionary
    for field in json_data:
        d = json_data[field]
        if type(d) == list:
            if type(d[0]) == dict:
                for v in d:
                    data.append(v)
            else:
                data.append(json_data[field])
        else:
            data[0][field] = json_data[field]

    return json.dumps(data, indent=4)


# write data to a file named 'newData.json'.
# with open('newData.json', 'w') as f:
#     f.write(format_name("githubData.json"))
