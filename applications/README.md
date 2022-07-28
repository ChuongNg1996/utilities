## Google API

### Youtube API

* [Source #1: Pedro Hernández - Medium - YouTube Data API v3 in Python: Tutorial with examples](https://medium.com/mcd-unison/youtube-data-api-v3-in-python-tutorial-with-examples-e829a25d2ebd)

Need 2 things: (1) **API key** & (2) **Google API Client Library**. 

**1. GETTING API KEY**

Make a *Google Account* -> Go to [*Google Cloud Platform*](https://console.cloud.google.com/welcome?project=noble-maxim-285912) -> *Select a project* (top left) and *NEW PROJECT* to make project -> Go to project's *dashboard* -> Go to bottow left to find *Explore and enable APIs* (in *Getting Started*) -> Click on *+ ENABLE APIS AND SERVICES* at the top to go to **API Library**, choose **YouTube Data API v3** and click *ENABLE*. -> Get directed to **API Overview page** and click on *CREATE CREDENTIALS*, select *YouTube Data API v3* with *Public data* and *NEXT*. -> Get the **API KEY** 

We can always check the key again in ** Credentials screen** (at the top left)

<p align="center">
  <img src="/images/api-key.png">
</p>

**2. GOOGLE API CLIENT LIBRARY**

For Python
  ```sh
  # For Anaconda
  conda install -c conda-forge google-api-python-client 
  # For Pip
  pip install google-api-python-client
  ```

**3. EXAMPLE: VIDEO SEARCH**

  ```sh
  # check the Python file /Youtube_API/youtube_api_search.py
  python youtube_api_search.py
  ```
