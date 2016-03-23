start:
	@sudo apachectl -f /vagrant/apache2.conf
	@echo 'Server started on localhost port 8080'

stop:
	@sudo apachectl stop
	@echo 'Server stopped'