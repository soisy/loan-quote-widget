FROM node:lts-alpine as modules
WORKDIR "/loan-quote-widget/soisy"

COPY ./soisy/package* ./
RUN npm i

FROM node:lts-alpine
WORKDIR "/loan-quote-widget/soisy"

RUN npm i -g --unsafe-perm nx full-icu gulp-cli
ENV NODE_ICU_DATA="/usr/local/lib/node_modules/full-icu"
COPY ./soisy ./
COPY --from=modules /loan-quote-widget/soisy/node_modules /node_modules

COPY ./.docker/build /usr/local/bin/build
RUN chmod +x /usr/local/bin/build

EXPOSE 4200

CMD ["start"]
ENTRYPOINT ["npm", "run"]