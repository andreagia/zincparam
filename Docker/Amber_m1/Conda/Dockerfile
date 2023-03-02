FROM --platform=linux/amd64 ubuntu:20.04 as build

#MAINTAINER Andrea Giachetti <Giachetti@cerm.unifi.it>
#LABEL description="Container image to run ambertools with sander MPI"
ENV TZ=Europe/Rome
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt -y update
RUN apt -y upgrade
RUN mkdir /prog
RUN apt -y install build-essential
ENV CONDA_DIR /opt/conda
# Download ambertools from https://ambermd.org/AmberTools.php
COPY Miniconda3-py310_23.1.0-1-Linux-x86_64.sh /root
WORKDIR /root
RUN bash Miniconda3-py310_23.1.0-1-Linux-x86_64.sh -b -p /opt/conda
ENV PATH=$CONDA_DIR/bin:$PATH
RUN  conda install -y -c conda-forge ambertools
RUN mkdir /work
WORKDIR /work