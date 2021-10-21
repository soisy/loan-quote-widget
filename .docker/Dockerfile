FROM node:lts-alpine
WORKDIR "/loan-quote-widget/soisy"

RUN npm i -g --unsafe-perm nx full-icu gulp-cli
ENV NODE_ICU_DATA="/usr/local/lib/node_modules/full-icu"

COPY ./.docker/build /usr/local/bin/build
RUN chmod +x /usr/local/bin/build

EXPOSE 4200

CMD nx serve --host=0.0.0.0