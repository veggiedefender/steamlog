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
then starts the logger. To run the logger without resetting, run `python start_logger.py`.

## Running the server
Create a secret key (used for signing cookies) and put it in `config.py`. I don't recommend using an actual
password. Just run `base64 -w 0 /dev/urandom` (the `-w 0` strips newlines) for a bit and copy and paste a 
sizeable chunk into your config.

Then run the dev server with `./run.py`.

You can deploy this behind [nginx](https://www.nginx.com/) with this
[nice guide](https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-uwsgi-and-nginx-on-ubuntu-16-04)
from DigitalOcean.

## Building the front end
You'll need a js package manager like [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/en/). I prefer yarn and I'll assume you're using it for the rest of this guide.

The react front end lives in `/frontend/`. `cd` into there and `yarn install` to install dependencies.

`public/index.html` is actually a [jinja](http://jinja.pocoo.org/) template as well as the webpack entry point. We have a problem here since we put some [important data](https://github.com/veggiedefender/steamlog/blob/71426924ce323333d1f3ab2bcf1e193537b22014/frontend/public/index.html#L10-L15) in there with jinja so our react dev server will fail. Before you start editing the front end, replace that block with some user's data like this:
```
window.info = {        
    name: "avenx",
    steam_id: "76561197998217622",
    state: 7,
    picture: "61c70da5a1caa22492d40e3d91a41f0d1e4f1c10"
}
```
Make sure to revert it or `git checkout` it before you build or push. There's probably an easier automated way to do this but I haven't found it.

### Starting the dev server
Inside `/frontend` just run `yarn start` to open up a development server with hot reloading. Also make sure your [flask server is running](https://github.com/veggiedefender/steamlog#running-the-server) at the same time to access the API.

### Running builds
Run `yarn run build` to run the minified and optimized build. It will also run [`installToFlask.sh`](https://github.com/veggiedefender/steamlog/blob/master/frontend/installToFlask.sh) which will copy the built assets into the appropriate flask directories, ready to be served.
