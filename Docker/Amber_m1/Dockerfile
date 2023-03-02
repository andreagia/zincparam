FROM --platform=linux/amd64 ubuntu:20.04 as build

#MAINTAINER Andrea Giachetti <Giachetti@cerm.unifi.it>
#LABEL description="Container image to run ambertools with sander MPI"
ENV TZ=Europe/Rome
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt -y update
RUN apt -y upgrade
RUN mkdir /prog
# Download ambertools from https://ambermd.org/AmberTools.php
COPY AmberTools22.tar.bz2 /prog
RUN cd /prog \
    && bunzip2 AmberTools22.tar.bz2 \
	&& tar xvf AmberTools22.tar \
	&& rm AmberTools22.tar
RUN apt -y install build-essential tcsh make \
               gcc gfortran \
               flex bison patch \
               bc xorg-dev libbz2-dev wget \
               cmake libatlas-base-dev
ENV LD_LIBRARY_PATH=/usr/local/lib/
ENV LC_CTYPE=en_US.UTF-8
WORKDIR /prog/amber22_src/build
ENV AMBERHOME=/prog/amber20_src
RUN apt -y install python3
RUN cd .. && python3 update_amber --update
RUN apt -y remove python3*
RUN ./run_cmake -DCMAKE_INSTALL_PREFIX=/prog/amber22
RUN  make install
#RUN  cmake /prog/amber22_src \
#    -DCMAKE_INSTALL_PREFIX=/prog/amber22 \
#    -DCOMPILER=GNU \
#    -DMPI=FALSE -DCUDA=FALSE -DINSTALL_TESTS=FALSE \
#    -DDOWNLOAD_MINICONDA=TRUE -DMINICONDA_USE_PY3=TRUE
#RUN  make install

#RUN cd build && ./run_cmake && make install -j5
RUN cd /prog && rm -rf amber22_src
ENV AMBERHOME=/prog/amber22
ENV PATH=$PATH:$AMBERHOME/bin
WORKDIR /opt
RUN apt -y install ssh

FROM --platform=linux/amd64 ubuntu:20.04
MAINTAINER Andrea Giachetti <Giachetti@cerm.unifi.it>
LABEL description="Container image to run ambertools with sander MPI"
ENV TZ=Europe/Rome
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt -y update
RUN apt -y upgrade
RUN apt -y install build-essential tcsh make \
               gcc gfortran \
               flex bison patch \
               bc xorg-dev libbz2-dev wget \
               cmake ssh libatlas-base-dev
RUN mkdir /prog

COPY --from=build /prog/amber22 /prog/amber22
RUN useradd -ms /bin/bash ambertools
RUN chown -R ambertools:ambertools /prog/amber22
RUN chown -R  ambertools:ambertools /opt
USER ambertools
ENV LD_LIBRARY_PATH=/usr/local/lib/
ENV AMBERHOME=/prog/amber22
ENV PATH=$PATH:$AMBERHOME/bin
WORKDIR /opt
