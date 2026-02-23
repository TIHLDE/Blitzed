FROM node:22-alpine AS build

RUN apk add --no-cache openssl

WORKDIR /build

COPY . .

RUN corepack enable pnpm

RUN pnpm i --frozen-lockfile

ENV SKIP_ENV_VALIDATION=1

# NEXT_PUBLIC_ variables are inlined at build time by Next.js.
# This must be set during the build for the client bundle to work.
ARG NEXT_PUBLIC_LEPTON_API_URL=https://api.tihlde.org
ENV NEXT_PUBLIC_LEPTON_API_URL=$NEXT_PUBLIC_LEPTON_API_URL

RUN pnpm build

FROM node:22-alpine AS runner

WORKDIR /app

RUN apk add --no-cache openssl
# Prisma is used in prod deployment
RUN npm install -g prisma

COPY --from=build /build/.next/standalone ./
RUN rm -f .env
COPY --from=build /build/.next/static ./.next/static/
COPY --from=build /build/prisma ./prisma/
COPY --from=build /build/public ./public/

EXPOSE 3000
ENV PORT=3000

ENV NEXT_TELEMETRY_DISABLED=1

CMD [ "node", "server.js" ]
