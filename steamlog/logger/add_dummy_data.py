from steamlog import db
from steamlog.models import User, GameEvent
from datetime import datetime

# that's me!
user = User.query.filter_by(steam_id="76561198061699578").one()

event_json = [{'game_id': 495780,
               'start_time': 1492607766.772653,
               'stop_time': 1492610919.145611},
              {'game_id': 352580,
               'start_time': 1492610919.145611,
               'stop_time': 1492619977.999087},
              {'game_id': 314470,
               'start_time': 1492619977.999087,
               'stop_time': 1492626453.013252},
              {'game_id': 588890,
               'start_time': 1492626463.070307,
               'stop_time': 1492626469.24284},
              {'game_id': 314470,
               'start_time': 1492626477.875079,
               'stop_time': 1492626482.907512},
              {'game_id': 314470,
               'start_time': 1492626491.918988,
               'stop_time': 1492626495.184968},
              {'game_id': 588890,
               'start_time': 1492626503.907041,
               'stop_time': 1492626511.188967},
              {'game_id': 588890,
               'start_time': 1492626518.770648,
               'stop_time': 1492626523.891032},
              {'game_id': 314470,
               'start_time': 1492626530.999468,
               'stop_time': 1492626539.743911},
              {'game_id': 588890,
               'start_time': 1492626549.457318,
               'stop_time': 1492626553.675304},
              {'game_id': 588890,
               'start_time': 1492626561.046844,
               'stop_time': 1492626564.317374},
              {'game_id': 314470,
               'start_time': 1492626572.047652,
               'stop_time': 1492626577.503765},
              {'game_id': 588890,
               'start_time': 1492626584.955757,
               'stop_time': 1492639287.189061},
              {'game_id': 314470,
               'start_time': 1492639287.189061,
               'stop_time': 1492643210.834246},
              {'game_id': 314470,
               'start_time': 1492643381.427214,
               'stop_time': 1492647765.816972},
              {'game_id': 316370,
               'start_time': 1492647765.816972,
               'stop_time': 1492648817.118998}]


def add_dummy_data():
    for event in event_json:
        event = GameEvent(
            start_time=datetime.fromtimestamp(event["start_time"]),
            stop_time=datetime.fromtimestamp(event["stop_time"]),
            user=user,
            game_id=event["game_id"]
        )
        db.session.add(event)
    db.session.commit()
