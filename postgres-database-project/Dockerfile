FROM postgres:16

ENV POSTGRES_DB=mydatabase
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword

COPY ./src/migrations /docker-entrypoint-initdb.d/migrations
COPY ./src/seeds /docker-entrypoint-initdb.d/seeds
COPY ./src/functions /docker-entrypoint-initdb.d/functions
COPY ./src/views /docker-entrypoint-initdb.d/views
COPY ./src/triggers /docker-entrypoint-initdb.d/triggers
COPY ./scripts/setup.sql /docker-entrypoint-initdb.d/setup.sql

EXPOSE 5432