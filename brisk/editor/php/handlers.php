<?php 

    function response(){
        $my_results_array = array(
        	//'loc' => $_REQUEST["_location"],
        	'script_name'=> $_SERVER["SCRIPT_NAME"],
        	'pathComponent' => $_REQUEST["pathComponent"],
        	'pathName' => $_REQUEST["pathName"]
        ); 
        echo  json_encode($my_results_array);
    }

    function filePathToEdit(){
        return "../..". $_REQUEST["pathName"]."index.html";
    }

    function writeHandler(){
        if( array_key_exists('page', $_REQUEST) ){ // If we are revieving an html page.
            writeDocTypeToFile( filePathToEdit() );
            writeStringOfLinesToFile($_REQUEST['page'], filePathToEdit());
            response();
        }
    }

?>