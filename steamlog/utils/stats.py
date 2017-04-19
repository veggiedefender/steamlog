from flask import jsonify


def basic_info(user):
    return jsonify({
        "name": user.name,
        "steam_id": user.steam_id,
        "picture": user.picture
    })
