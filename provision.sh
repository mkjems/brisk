#!/bin/bash

# Updating repository
sudo apt-get -qqy update

# Installing Apache
sudo apt-get -y install apache2

# Installing PHP and it's dependencies
sudo apt-get -y install php5 libapache2-mod-php5 php5-mcrypt

vagrantTip="[35m[1mThe shared directory is located at /vagrant\nTo access your shared files: cd /vagrant(B[m"
echo -e $vagrantTip > /etc/motd

