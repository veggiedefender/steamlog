import requests
import time


def get_json(url):
    """
    Retry a URL until it returns a valid json
    """
    while True:
        try:
            r = requests.get(url).json()
            assert r is not None
        except Exception:
            time.sleep(1)
            continue
        break
    return r
