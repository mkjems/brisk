<?php

    function writeArrayOfStringsToFile($arr,$filePath){
        $fh = fopen($filePath, 'w') or die("can't open file");
        foreach ($arr as $line){
            fwrite($fh, $line . "\n");
        }
        fclose($fh);
    }

    function appendArrayOfStringsToFile($arr,$filePath){
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
        writeArrayOfStringsToFile($docType,'index.brisk.php');  
    }

?>