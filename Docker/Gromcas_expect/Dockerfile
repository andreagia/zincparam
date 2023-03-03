FROM --platform=linux/amd64 gromacs/gromacs:2022.2

#MAINTAINER Andrea Giachetti <Giachetti@cerm.unifi.it>
#LABEL description="Container image to run ambertools with sander MPI"
ENV TZ=Europe/Rome
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt -y update
RUN apt -y install expect
RUN mkdir /work
WORKDIR /work