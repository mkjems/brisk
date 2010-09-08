
var editorLoader = function(){
   
   var path; // Provided by the page to be edited.
   var pathToEditor; 
   var nextScriptToLoad = 0;  
   
   var scriptsToLoad =[
       {file:'jquery-1.4.2.min.js',test:'jQuery'},
       {file:'shortcut.js',test:'shortcut'},
       {file:'api.js', test:'api'},
       {file:'editor.js', test:'editor'}
   ];      
   
   function setPathToEditorFolder () {
       var pathComponent = document.getElementById('loaderTag').getAttribute('src',2).replace('editor/js/editorLoader.js','');
       pathToEditor = 'http://' + window.location.host + '/' + pathComponent + 'editor/' ;
       console.log('pathToEditor: ', pathToEditor);
   }
   
   var loaded = {};

   function writeScriptTag (file){
       var bodyID = document.getElementsByTagName("body")[0];
       var newScript = document.createElement('script');
       newScript.type = 'text/javascript';
       newScript.src = pathToEditor + 'js/' + file;
       bodyID.appendChild(newScript);
   }
   
   function waitFor(variableName){
       var timer = setInterval(function(){
           if(window[variableName]){
               clearInterval(timer);
               loadNextScript();   
           } else {
               console.log('waiting for: ' + variableName);
           }
       },50);
   }
  
   function loadNextScript(){
       if(scriptsToLoad[nextScriptToLoad]){
           writeScriptTag(scriptsToLoad[nextScriptToLoad].file);
           waitFor(scriptsToLoad[nextScriptToLoad].test);
           nextScriptToLoad++;
       }
   }
   
   function writeCssTag (file){
       var bodyID = document.getElementsByTagName("head")[0];
       var newTag = document.createElement('link');
       newTag.type = 'text/css';
       newTag.media = 'screen';
       newTag.rel = 'stylesheet';
       newTag.href = pathToEditor + 'css/' + file;
       bodyID.appendChild(newTag);
   }
   
   
   function injectCssFiles(){
       var cssFiles = [
           'editor.css'
       ];
       var i;
       for(i=0;i<cssFiles.length;i++){
           writeCssTag(cssFiles[i]);
       } 
   }
   
   return {
        config: function () {
            setPathToEditorFolder();
            injectCssFiles();
            loadNextScript();
        },
        getPathToEditor: function(){
            return pathToEditor;
        }
   }; 
}();
