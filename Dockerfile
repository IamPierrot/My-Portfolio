FROM node:18-alpine AS frontend_build

WORKDIR /app

COPY ./client/package.json /app/package.json
RUN npm install

COPY ./client /app/client 
RUN npm run build

FROM python:3.11-slim

WORKDIR /app

COPY ./server/requirements.txt /app/server/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /app/server/requirements.txt

COPY ./server /app/server
COPY ./public /app/public

COPY --from=frontend_build /app/client/dist /app/dist

EXPOSE 8000

CMD [ "fastapi", "run", "server/main.py" ]
