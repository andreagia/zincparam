FROM maven
LABEL Andrea Giachetti <giachetti@cerm.unifi.it>

RUN git clone https://oneservice.cerm.unifi.it/andrea/zincparamwebservice.git
RUN cd zincparamwebservice
WORKDIR /zincparamwebservice
RUN mvn package
CMD /bin/sh -c "java -jar target/zincparam-0.0.1-SNAPSHOT.war"