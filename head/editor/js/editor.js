
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

    function dumpElement( element ) { // http://stackoverflow.com/questions/652763/jquery-object-to-string
        var elementDump;
        var attrDump = ''; // dump element attributes
        var attribute;
        var dumpedAttribute;
        for( var i = 0; i < element.attributes.length; i++) {
            attribute = element.attributes[i];
            if ( attribute.specified == false ) continue; // skip every not specified attribute (useful for example in IE)
            dumpedAttribute = attribute.name + '="' + attribute.value + '"'; // current attribute dump
            attrDump += ((attrDump != '')?' ':'') + dumpedAttribute; // add current attribute to dump, separating attributes with whitespace
        }
        var tagName = element.tagName.toLowerCase();
        // note: innerHTML does not preserve code formatting
        // note: innerHTML on IE sets the tags names to uppercase (e.g. not W3C Valid)
        if( element.innerHTML == '' ) {
            elementDump = '<' + tagName + ((attrDump != '')? ' '+attrDump : '') + '/>'; // self closing tag syntax  
        } else {
            elementDump = '<' + tagName + ((attrDump != '')? ' '+attrDump : '') + '>' + element.innerHTML + '</' + tagName + '>';
        }
        return elementDump;
    }

    function callWithApi(){
        var caller = new api();
        caller.action = 'write';
        caller.parameters.page = dumpElement($('html').get()[0]);
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
            alert('Edit mode OFF');
            callWithApi();
        } else {
            editmode = true;
            startHighlighting();
            alert('Edit mode ON!');

        }
    }

    function listenForKeyboardShortcuts () {
        shortcut.add("Ctrl+E",function() {
            toggleEditMode();
        });
    }

    listenForKeyboardShortcuts();

    return {};
}();

