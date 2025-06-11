FROM ubuntu:24.04

ARG version=20

RUN apt-get update -y && apt-get install curl unzip -y \
    && curl -fsSL https://fnm.vercel.app/install | bash -s -- --install-dir './fnm' \
    && cp ./fnm/fnm /usr/bin && fnm install $version && apt-get install npm netcat-traditional -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=4096"
# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm cache clean --force && npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Generate Prisma Client code
RUN npx prisma generate

# Build application
RUN npm run build

EXPOSE 8000
EXPOSE 587 

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

CMD ["/bin/bash", "/app/entrypoint.sh"]
