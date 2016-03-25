
var editorLoader = function(){
   
   var pathComponent; // calculated from the relative path to editorLoader.js
   var urlToEditor; 
   var nextScriptToLoad = 0;  
   
   function  getPathComponent(){
       return '/' + pathComponent;
   }
   
   var scriptsToLoad =[{
            file:'jquery-1.4.2.min.js',
            test:'jQuery',
            id:'brisk-jquery'
        },{
            file:'shortcut.js',
            test:'shortcut',
            id:'brisk-shortcut'
        },{
            file:'api.js',
            test:'api',
            id:'brisk-api'
        },{
            file:'editor.js',
            test:'editor',
            id:'brisk-editor'
        }
   ];      
   
   function setUrlToEditorFolder () {
       pathComponent = document.getElementById('loaderTag').getAttribute('src',2).replace('editor/js/editorLoader.js',''); // Setting!
       console.log('pathComponent: ', getPathComponent());
       urlToEditor = 'http://' + window.location.host + '/editor/' ;
       console.log('urlToEditor: ', urlToEditor);
   }
   
   var loaded = {};

   function writeScriptTag (file, id){
       var bodyID = document.getElementsByTagName("body")[0];
       var newScript = document.createElement('script');
       newScript.id = id;
       newScript.type = 'text/javascript';
       newScript.src = urlToEditor + 'js/' + file;
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
           writeScriptTag(scriptsToLoad[nextScriptToLoad].file, scriptsToLoad[nextScriptToLoad].id);
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
       newTag.href = urlToEditor + 'css/' + file;
       bodyID.appendChild(newTag);
   }
   
   
   function injectCssFiles(){
       var cssFiles = [
           'brisk-editor.css'
       ];
       var i;
       for(i=0;i<cssFiles.length;i++){
           writeCssTag(cssFiles[i]);
       } 
   }
   
   
   return {
        config: function () {
            setUrlToEditorFolder();
            injectCssFiles();
            loadNextScript();
        },
        getUrlToEditor: function(){
            return urlToEditor;
        },
        getPathComponent: getPathComponent
   }; 
}();
