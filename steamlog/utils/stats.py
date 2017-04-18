from flask import jsonify


def general_info(user):
    return jsonify({
        "name": user.name,
        "steam_id": user.steam_id,
        "picture": user.picture
    })
