dropdb steamlog
createdb steamlog
python create_db.py
python -c "from steamlog import logger; \
           logger.add_users(); \
           logger.add_games(); \
           logger.add_dummy_data()"
# python run.py
