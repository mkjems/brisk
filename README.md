# Brisk

A static file editing system using Apache an PHP and Javascript. taking advantage of [contentEditable](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_Editable).

The idea behind Brisk is to investigate what it would be like to allow visitors of a single file webpage to edit the contents of any html tag on the page, and then save that content straight to the file, when editing is done. To edit it Briskly so to speak.

Usecase example: Lets say you have some webdesigners producing nice html and css. Then the the copy writers or translators
could fill the correct text straight into the templates using brisk.

This is very much just a crazy experiment. There are several problematic issues that make this implementation probably a bad idea. However, I had fun building it, and it does work to some extend. And you can try it out if you want.

## 1. Requirements

Vagrant

## 2. Installation

Clone the repo.

	cd brisk
	vagrant up
	vagrant ssh
	cd /vagrant
	make start

You should then be able to see the something on [localhost:8080](http.//localhost:8080)

## 3. Try editing a flat file in your browser

Once you are looking at the / root page, try this:

- Press Ctrl-e. Now you are in edit mode.
- When you hover the text with the cursor, you shoud see a yellow highlight.
- Click any html tag, now the text is editable.
- Edit the content.
- Press Ctrl-e again to exit edit mode. The change is now saved to file on the server.
- Kinda cool right?

The demo site has two pages with links between them:

	/index.html
	/pageTwo/index.html

Try editing the pages and reload to see that the change has actually been saved.

## 4. How to use it for your pages

- You must use a static file server that also undersatnds PHP. I'm using apache with php.
- Place the brisk editor folder (brisk/brisk/editor) inside your served pages.
- A script tag must be placed in all the files you want to be editable:

	<script id="loaderTag" type="text/javascript" src="../editor/js/editorLoader.js" onload="editorLoader.config();"></script>


## 5. How does it work.

The single js script tag you added inserts some more script tags and also a link to a stylesheet.
Now the javascript editor is fully loaded in the browser and waiting for a ctrl-e.
When ctrl-e is pressed the highlighting is activated and if you click the element is editable using the `contenteditable` attribute.

Pressing ctrl-e again exits edit mode and collects the entire page as a string, making sure to exclude the brisk editing code.  The string is posted to the server where it is saved to disk replacing the previous version.


