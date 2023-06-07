## install
RUN git clone https://github.com/andreagia/zincparam.git
RUN cd zincparamwebservice
WORKDIR /zincparamwebservice
RUN mvn package
CMD /bin/sh -c "java -jar target/zincparam-0.0.1-SNAPSHOT.war"

##debian apache2 configuration

apt install apache2

sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod proxy_balancer
sudo a2enmod lbmethod_byrequests


vi /etc/apache2/sites-available/000-default.conf


<VirtualHost *:80>
    ProxyPreserveHost On

    ProxyPass / http://127.0.0.1:8080/
    ProxyPassReverse / http://127.0.0.1:8080/
</VirtualHost>
a