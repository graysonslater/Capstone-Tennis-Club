#loads image from docker hub
FROM python:3.9.18-alpine3.18

#Installs the build-base package, which includes essential build tools
RUN apk add build-base

# Installs dependencies for PostgreSQL and Python development
RUN apk add postgresql-dev gcc python3-dev musl-dev

#Similar to the previous line, but uses the --no-cache flag to reduce image size
# RUN apk add --no-cache build-base postgresql-dev gcc python3-dev musl-dev

#Sets the working directory inside the container to /var/www
# WORKDIR /var/www

#Define build-time variables that can be passed during image building
ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY

#!why is this line repeated????
WORKDIR /var/www

#Copies the requirements.txt file from the host to the current directory in the container
COPY requirements.txt .

RUN apk add --update --no-cache postgresql-client && \
    apk add --update --no-cache --virtual .tmp-build-deps build-base postgresql-dev musl-dev

#Installs Python packages listed in requirements.txt
RUN pip install -r requirements.txt

#Installs the psycopg2 package, a PostgreSQL adapter for Python
RUN pip install psycopg2

#Copies all files from the current directory on the host to the working directory in the container
COPY . .

#run commands to create and populate DB
RUN flask db upgrade
RUN flask seed all

#Specifies the command to run when the container starts, using Gunicorn to serve the Flask application
CMD gunicorn app:app