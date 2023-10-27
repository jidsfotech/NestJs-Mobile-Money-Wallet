#Using pre-defined node base image
FROM node:10.0.0

WORKDIR /src

# Copy package.json. To take advantage of cached Docker layer
COPY package.json /src

RUN npm install

COPY . /src

# Expose web service
EXPOSE 9001

CMD [ "npm", "run", "start:dev" ]
 