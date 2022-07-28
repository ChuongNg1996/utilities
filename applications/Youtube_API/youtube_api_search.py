# Tutorial: Pedro Hernández (Medium) - YouTube Data API v3 in Python: Tutorial with examples
# https://medium.com/mcd-unison/youtube-data-api-v3-in-python-tutorial-with-examples-e829a25d2ebd

# API client library
import googleapiclient.discovery
# API information
api_service_name = "youtube"
api_version = "v3"
# API key
DEVELOPER_KEY = "AIzaSyB479RN2J804dJfExC9RhiQpUeWO341yug"
# API client
youtube = googleapiclient.discovery.build(
    api_service_name, api_version, developerKey = DEVELOPER_KEY)
# 'request' variable is the only thing you must change
# depending on the resource and method you need to use
# in your query
request = youtube.search().list(
        part="id,snippet",
        type='video',
        q="Spider-Man",
        videoDuration='short',
        videoDefinition='high',
        maxResults=100
)
# Query execution
response = request.execute()
# Print the results
print(response)