import requests


def get_json(url):
    """
    Retry a URL until it returns a valid json
    """
    while True:
        try:
            r = requests.get(url).json()
        except Exception:
            time.sleep(1)
            continue
        break
    return r
