"""Initial migration

Revision ID: 3bee74e1cd5d
Revises: 
Create Date: 2020-04-03 10:46:44.573853

"""
from alembic import op
import sqlalchemy as sa
import datetime


# revision identifiers, used by Alembic.
revision = '3bee74e1cd5d'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('movie',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('director', sa.String(), nullable=True),
        sa.Column('watched', sa.Boolean(), default=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

    op.create_table('artist',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

    op.create_table('source',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('source_link', sa.String(), nullable=True),
        sa.Column('source_short_name', sa.String(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )

    op.create_table('recommendation',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('artist_id',  sa.Integer(), nullable=False),
        sa.Column('movie_id', sa.Integer(), nullable=False),
        sa.Column('source_id', sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['artist_id'], ['artist.id'], ),
        sa.ForeignKeyConstraint(['movie_id'], ['movie.id'], ),
        sa.ForeignKeyConstraint(['source_id'], ['source.id'], ),
    )

def downgrade():
    op.drop_table('recommendation')
    op.drop_table('movie')
    op.drop_table('artist')
    op.drop_table('source')
