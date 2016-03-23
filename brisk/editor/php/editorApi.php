<?php

    error_reporting(E_ALL);
    
    include('file_functions.php');
    include('handlers.php');
    
    if( $_REQUEST["_action"] == "write"){        
        writeHandler();
    } 
    
?>