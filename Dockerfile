FROM node:lts-alpine AS runtime
WORKDIR /app

COPY . .

RUN yarn
RUN yarn build

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD yarn prod