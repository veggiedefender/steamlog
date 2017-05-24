"""empty message

Revision ID: a5e7f554684b
Revises: 
Create Date: 2017-05-23 22:06:39.414065

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a5e7f554684b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('private', sa.Boolean(), server_default="false"))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'private')
    # ### end Alembic commands ###