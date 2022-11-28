import json


def format_name(file_name: str):
    """
    Parses the given JSON name and returns a JSON string in a format suitable for React.js.
    * `file_name`: the name of the JSON file to format
    * Returns: the formatted file as a string
    """

    json_file = open(file_name)
    json_data = json.load(json_file)
    data = [{}]  

    # if the field is a list of dictionaries, add the dictionaries within the list
    # otherwise, add the field to a separate dictionary
    for field in json_data:
        d = json_data[field]
        if type(d) == list:
            if type(d[0]) == iter:
                for v in d:
                    data.append(v)
            else:
                data.append({field: json_data[field]})
        else:
            data[0][field] = json_data[field]

    return json.dumps(data, indent=4)


def format_data(json_data):
    """
    Formats and returns the given JSON file in a format suitable for React.js.
    * `json_data`: the JSON string
    * Returns: the formatted file as a string
    """

    # functionally useless?
    return json.dumps(json.loads(json_data), indent=4)


# write data to a file named 'newData.json'.
# with open('newData.json', 'w') as f:
    # f.write(format("githubData.json"))



