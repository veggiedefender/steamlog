from steamlog.utils import get_json
from steamlog import app


def get_info(steam_id):
    """
    Looks like this:
    {
        "steamid": "76561198061699578",
        "communityvisibilitystate": 3,
        "profilestate": 1,
        "personaname": "veggiedefender",
        "lastlogoff": 1491510029,
        "commentpermission": 1,
        "profileurl": "http://steamcommunity.com/id/veggiedefender/",
        "avatar": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/af/af87fde8c72f4c3362248cdb796a9be927799996.jpg",
        "avatarmedium": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/af/af87fde8c72f4c3362248cdb796a9be927799996_medium.jpg",
        "avatarfull": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/af/af87fde8c72f4c3362248cdb796a9be927799996_full.jpg",
        "personastate": 0,
        "realname": "Jesse",
        "primaryclanid": "103582791429521408",
        "timecreated": 1333983948,
        "personastateflags": 0,
        "loccountrycode": "US"
    }
    """
    url = app.config["STEAM_SUMMARIES"] + str(steam_id)
    resp = get_json(url)
    return resp["response"]["players"][0]
