#nx stage could be published to a registry as base image 
FROM node:16.14.2 as nx 

ENV DEBIAN_FRONTEND noninteractive
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
ENV LC_ALL en_US.UTF-8
ENV LC_CTYPE en_US.UTF-8
ENV TZ UTC

ENV PATH "$PATH:/soisy/webapp/app/node_modules/.bin"

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin 
    
USER node
RUN npm i -g --unsafe-perm nx@13.10.3 full-icu gulp-cli
ENV NODE_ICU_DATA="/home/node/.npm-global/lib/node_modules/full-icu"

FROM nx as build

RUN mkdir -p /home/node/app
WORKDIR "/home/node/app"

COPY --chown=node:node soisy/package.json ./
COPY --chown=node:node soisy/package-lock.json ./
RUN npm ci
COPY --chown=node:node soisy ./
RUN npm run build:bundle

FROM scratch as export-bundle
COPY --from=build /home/node/app/dist /

FROM build as development

USER root

#Install gosu
RUN set -eux; \
	apt-get update; \
	apt-get install -y gosu; \
	rm -rf /var/lib/apt/lists/*; \
# verify that the binary works
	gosu nobody true

COPY .docker/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

EXPOSE 4200
CMD ["nx", "serve", "--host=0.0.0.0"]
