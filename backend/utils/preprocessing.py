def preprocess_data(input_data):
    return [
        input_data.get("post_karma", 0),
        input_data.get("comment_karma", 0),
        input_data.get("listed_count", 0)
    ]
