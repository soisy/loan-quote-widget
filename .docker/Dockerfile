FROM node:lts-alpine as modules
WORKDIR "/loan-quote-widget/soisy"

COPY ./soisy/package* ./
RUN npm i

FROM node:lts-alpine
WORKDIR "/loan-quote-widget/soisy"

RUN npm i -g nx
COPY ./soisy ./
COPY --from=modules /loan-quote-widget/soisy/node_modules /node_modules

EXPOSE 4200

CMD ["start"]
ENTRYPOINT ["npm", "run"]