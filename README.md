# steamlog
Keep track of when you (and your friends!) play games on Steam.

## Notes:
* This uses [Python 3.6 f-strings](https://www.python.org/dev/peps/pep-0498/) for logging, so either
  find and remove them or upgrade your Python version.
* This is a Flask app but the logger is inside the `steamlog/logger` module so they can share the same
  SQLAlchemy models and configuration. The logger and web server **can** (and should) run independently.
* Install postgresql before continuing and edit `config.py`.
* Get a [Steam API Key](http://steamcommunity.com/dev/apikey) and add it to `config.py`

## Setting up the logger
```
cd steamlog
python3.6 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
./reset.sh
```

`reset.sh` drops and creates a database called `steamlog`, adds sample users, adds all (known) Steam games,
then starts the logger. To run the logger without restarting, run `python start_logger.py`.

## Running the server
Create a secret key (used for signing cookies) and put it in `config.py`. I don't recommend using an actual
password. Just run `base64 -w 0 /dev/urandom` (the `-w 0` strips newlines) for a bit and copy and paste a 
sizeable chunk into your config.

Then just run the dev server with `python run.py`.

You can deploy this behind [nginx](https://www.nginx.com/) with this
[nice guide](https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-uwsgi-and-nginx-on-ubuntu-16-04)
from DigitalOcean.
