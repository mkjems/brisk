<?php

    function makeWriteable($f){
        $p = $_SERVER['DOCUMENT_ROOT']."/editor/php/" . $f;
        chmod($p, 0777);
    }

    function writeArrayOfStringsToFile($arr,$filePath){
        makeWriteable($filePath);
        $fh = fopen($filePath, 'w') or die("can't open file");
        foreach ($arr as $line){
            fwrite($fh, $line . "\n");
        }
        fclose($fh);
    }

    function appendArrayOfStringsToFile($arr,$filePath){
        makeWriteable($filePath);
        $fh = fopen($filePath, 'a') or die("can't open file");
        foreach ($arr as $line){
            fwrite($fh, $line . "\n");
        }
        fclose($fh);
    }
    
    function writeStringOfLinesToFile($strOfLines, $filePath){
        $pieces = explode("\n", $strOfLines);
        appendArrayOfStringsToFile($pieces,$filePath); 
    }

    function writeDocTypeToFile($filePath){
        $docType = array('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"', '	 "http://www.w3.org/TR/html4/loose.dtd">' );
        writeArrayOfStringsToFile($docType, $filePath);  
    }
    
    function ftpTest (){
        $conn_id = ftp_connect($ftp_server); // set up basic connection 
        $login_result = ftp_login($conn_id, $ftp_user_name, $ftp_user_pass); // login with username and password
        if ((!$conn_id) || (!$login_result)) { // check connection
            echo "FTP connection has failed!";
            echo "Attempted to connect to $ftp_server for user $ftp_user_name"; 
            exit; 
        } else {
            echo "Connected to $ftp_server, for user $ftp_user_name";
        }
        $upload = ftp_put($conn_id, $destination_file, $source_file, FTP_BINARY); // upload the file
        if (!$upload) { // check upload status
            echo "FTP upload has failed!";
        } else {
            echo "Uploaded $source_file to $ftp_server as $destination_file";
        }
        ftp_close($conn_id); // close the FTP stream    
    }
 


?>