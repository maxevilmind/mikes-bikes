FROM mongo

WORKDIR /mongo-seed

ADD dump.tar.gz ./

## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.3.0/wait /wait
RUN chmod +x /wait

CMD /wait && mongoimport --host mongodb --port 27017 --type json --file ./delivery_sites.json