FROM node:latest

MAINTAINER Christopher Johnson <chjohnson39@gmail.com>
LABEL description = "React Discovery App"
ARG CIRCLE_BRANCH
ENV CIRCLE_BRANCH=${CIRCLE_BRANCH}
RUN printenv
WORKDIR /srv/react-discovery
RUN git clone https://github.com/ubl-chj/solr-react.git ./
RUN git checkout ${CIRCLE_BRANCH}
RUN npm i npm@latest -g
RUN npm install --global lerna
RUN lerna bootstrap --hoist
RUN lerna run build
RUN yarn global add serve

COPY entrypoint.sh /entrypoint.sh
RUN chmod 700 /entrypoint.sh

EXPOSE 5000

ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "-s", "build" ]
