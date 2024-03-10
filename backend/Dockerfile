FROM ruby:3.2.2-slim

WORKDIR /rails

# Install necessary packages
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git libvips pkg-config libpq-dev && \
    rm -rf /var/lib/apt/lists/*

COPY Gemfile .
COPY Gemfile.lock .

RUN bundle install

COPY . .

CMD bash -c "rm -f tmp/pids/server.pid && bundle exec rails s -p 5401 -b '0.0.0.0'"