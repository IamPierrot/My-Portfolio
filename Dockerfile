FROM node:18-alpine AS frontend

WORKDIR /app

COPY ./client/package.json /app/package.json
RUN npm install

COPY ./client /app/ 
RUN npm run build

FROM python:3.11-slim

WORKDIR /app

COPY ./server/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt
RUN pip install "fastapi[standard]"

COPY ./server /app/server
COPY ./server/main.py /app/main.py
COPY ./public /app/public
COPY --from=frontend ./app/dist /app/dist

EXPOSE 8000

CMD [ "fastapi", "run" ]
