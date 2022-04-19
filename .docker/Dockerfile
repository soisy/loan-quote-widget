FROM node:lts as node

ENV DEBIAN_FRONTEND noninteractive
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
ENV LC_ALL en_US.UTF-8
ENV LC_CTYPE en_US.UTF-8
ENV TZ UTC

ENV PATH "$PATH:/soisy/webapp/app/node_modules/.bin"

ARG USER_ID=1000
ARG GROUP_ID=1000
ARG DOCKER_DIR=docker/frontend/web/

RUN echo "Using GID $GROUP_ID and UID $USER_ID" && \
    usermod -u 2000 node && \
    groupmod -g 2000 node && \
    mkdir /soisy && \
    cp -rT /etc/skel /soisy && \
    groupadd -g $GROUP_ID soisy && \
    useradd -l -m -s /bin/bash -g $GROUP_ID -u $USER_ID soisy  && \
    chown soisy:soisy /soisy && \
    apt-get update && \
    apt-get upgrade -y && \
    apt-get install --no-install-recommends -y locales \
      git curl xvfb libxss1 fonts-liberation gdebi-core libgtk2.0-0 \
      libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1  \
      libasound2 libxtst6 xauth xvfb && \
    sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    dpkg-reconfigure --frontend=noninteractive locales && \
    wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    gdebi --n google-chrome-stable_current_amd64.deb && \
    rm google-chrome-stable_current_amd64.deb && \
    apt-get remove --purge --autoremove -y  \
      gdebi-core build-essential && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists

USER soisy

WORKDIR "/loan-quote-widget/soisy"

ENV NPM_CONFIG_PREFIX=/soisy/.npm-global
# optionally if you want to run npm global bin without specifying path
ENV PATH=$PATH:/soisy/.npm-global/bin:/soisy/bin

RUN npm i -g --unsafe-perm nx full-icu gulp-cli
ENV NODE_ICU_DATA="/soisy/.npm-global/lib/node_modules/full-icu"

COPY --chown=soisy:soisy ./.docker/build /soisy/bin/build
RUN chmod +x /soisy/bin/build



EXPOSE 4200

CMD nx serve --host=0.0.0.0