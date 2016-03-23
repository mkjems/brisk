# Brisk

A flat file editing system using Apache an PHP and Javascript. taking advantage of Content editable.

The idea behind this project is investigate what it would be like to allow visitors of a single file webpage to edit the contents of any html tag on the page, and then save that content straight to the file, when editing is done.

This is very much just a crazy experiment. There are several problematic issues that make this a bad idea. Howerver I had fun building it and it does work to some extend. And you can try it out if you want.

# 1. Requirements

Vagrant

# 2. Installation

Clone the repo.

	cd brisk
	vagrant up
	vagrant ssh
	cd /vagrant
	make start

You should then be able to see the something on localhost:8080

# 3. Try it out on localhost:8080

- Press Ctrl-e. Now you are in edit mode.
- When you hover the text you shoud see a yellow highlight.
- Click any html tag, now the text is editable.
- Edit the content.
- Press Ctrl-e again to exit edit mode.

# 4. How does it work.

# 5. How to use it for your pages (Not recommended)

