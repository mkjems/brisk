<?php 

    function response(){
        $my_results_array = array(
        	//'loc' => $_REQUEST["_location"],
        	'script_name'=> $_SERVER["SCRIPT_NAME"],
        ); 
        echo  json_encode($my_results_array);
    }

    function writeHandler(){
        if( array_key_exists('page', $_REQUEST) ){
            writeDocTypeToFile('index.brisk.php');
            writeStringOfLinesToFile($_REQUEST['page'], 'index.brisk.php');
            response();
        }
    }

?>