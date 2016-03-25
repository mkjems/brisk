
var editor = function(){

    var editmode = false;

    var highlightClickFunc = function(e){
        e.preventDefault();
        e.stopPropagation();
        $('*').removeAttr('contenteditable');
        $(this).attr('contenteditable','true');
        $(this).focus();
    };

    function highlighter () {
        $('*').blur();
        $('*').removeClass('hightlight');
        $(this).addClass('hightlight');
        $('*').unbind('click',highlightClickFunc);
        $(this).bind('click',highlightClickFunc);
    }

    function startHighlighting () {
        $('h1').bind('mouseenter',highlighter);
        $('p').bind('mouseenter',highlighter);
        $('li').bind('mouseenter',highlighter);
        $('span').bind('mouseenter',highlighter);
        $('a').bind('mouseenter',highlighter);
    }

    function stopHighlighting () {
        $('h1').unbind('mouseenter',highlighter);
        $('p').unbind('mouseenter',highlighter);
        $('li').unbind('mouseenter',highlighter);
        $('span').unbind('mouseenter',highlighter);
        $('a').unbind('mouseenter',highlighter);
    }

    // var removeElements = function(text, selector) {
    //     console.log('removeElements', text);
    //     var wrapped = $(text);
    //     wrapped.find(selector).remove();
    //     console.log(wrapped);
    //     return wrapped.html();
    // }

    // function dumpElement( element ) { // http://stackoverflow.com/questions/652763/jquery-object-to-string
    //     var elementDump;
    //     var attrDump = ''; // dump element attributes
    //     var attribute;
    //     var dumpedAttribute;
    //     for( var i = 0; i < element.attributes.length; i++) {
    //         attribute = element.attributes[i];
    //         if ( attribute.specified == false ) continue; // skip every not specified attribute (useful for example in IE)
    //         dumpedAttribute = attribute.name + '="' + attribute.value + '"'; // current attribute dump
    //         attrDump += ((attrDump != '')?' ':'') + dumpedAttribute; // add current attribute to dump, separating attributes with whitespace
    //     }
    //     var tagName = element.tagName.toLowerCase();
    //     // note: innerHTML does not preserve code formatting
    //     // note: innerHTML on IE sets the tags names to uppercase (e.g. not W3C Valid)
    //     if( element.innerHTML == '' ) {
    //         elementDump = '<' + tagName + ((attrDump != '')? ' '+attrDump : '') + '/>'; // self closing tag syntax
    //     } else {
    //         elementDump = '<' + tagName + ((attrDump != '')? ' '+attrDump : '') + '>' + element.innerHTML + '</' + tagName + '>';
    //     }

    //     var elementDump = removeElements(elementDump, 'script');
    //     //var elementDump = removeElements(elementDump, 'link');
    //     console.log('no script', elementDump);

    //     return elementDump;
    // }

    function getPageHtmlWithoutBrisk (){
        var head = $('head').get()[0];
        // Get Head as a string
        var stringOfHead = head.innerHTML;
        var toBeRemovedFromHead = [];
        var links = $('link').each(function(){
            str = $(this).clone().wrap('<div/>').parent().html();
            if(str.indexOf('brisk') !== -1 ){
                toBeRemovedFromHead.push(str);
            }
        });
        // Remove the brisk stylesheet
        toBeRemovedFromHead.map(function(removeStr){
            stringOfHead = stringOfHead.replace(removeStr, '');
        });

        var body = $('body').get()[0];
        // Get body as string
        var stringOfBody = body.innerHTML;
        re = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
        var arr = stringOfBody.match(re);
        var toBeRemoved = [];
        // find brisk related scripts
        arr.map(function(val){
            if(val.indexOf('brisk') !== -1 ){
                toBeRemoved.push(val);
            }
        });
        // Remove brisk scripts
        toBeRemoved.map(function(val){
            stringOfBody = stringOfBody.replace(val, '');
        });

        var newHead = '<head>'+stringOfHead+'</head>';
        var newBody = '<body>'+stringOfBody+'</body>';
        var res = '<!DOCTYPE HTML><html>'+newHead+newBody+'</html>';

        return res;
    }

    function callWithApi(){
        var caller = new api();
        caller.action = 'write';
        caller.parameters.page = getPageHtmlWithoutBrisk();
        caller.parameters.pathComponent = editorLoader.getPathComponent();
        caller.parameters.pathName = window.location.pathname;
        caller.call();
    }

    function toggleEditMode(){
        if(editmode){
            editmode = false;
            stopHighlighting();
            $('*').unbind('click',highlightClickFunc);
            $('*').removeAttr('contenteditable');
            $('*').removeClass('hightlight');
            $('*').blur();
            //alert('Edit mode OFF');
            callWithApi();
        } else {
            editmode = true;
            startHighlighting();
            //alert('Edit mode ON!');

        }
    }

    function listenForKeyboardShortcuts () {
        shortcut.add("Ctrl+E",function() {
            toggleEditMode();
        });
    }

    listenForKeyboardShortcuts();

    return {
        getPageHtmlWithoutBrisk: getPageHtmlWithoutBrisk
    };
}();

