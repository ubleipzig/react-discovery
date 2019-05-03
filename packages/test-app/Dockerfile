FROM node:latest

MAINTAINER Christopher Johnson <chjohnson39@gmail.com>
LABEL description = "Solr React Test Implementation"

WORKDIR /srv/solr-react
RUN git clone https://github.com/ubl-chj/solr-react.git ./
RUN npm i npm@latest -g
RUN npm install --global lerna
WORKDIR /srv/solr-react
RUN lerna bootstrap --hoist
RUN lerna run --scope solr-react-faceted-search build
RUN lerna run --scope test-app build
RUN yarn global add serve

COPY entrypoint.sh /entrypoint.sh
RUN chmod 700 /entrypoint.sh

EXPOSE 5000

ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "-s", "build" ]
