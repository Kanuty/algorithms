<?php
  $path='./2_3.php';
  $file='2_3.php';

  function echoInLine($text){
    echo $text.'</br>';
  }
// Return filename
echoInLine(basename($path));
// Return filername withour ext
echoInLine(basename($path, '.php'));
// Return directory name from path (here there is not any dir)
echoInLine(dirname($path));
// Check if file exists(return (1) even if file isa folder)
echoInLine(file_exists($file));
// Get absolute path
echoInLine(realpath($file));
// Check to see if file
echoInLine(is_file($file));
// Check if writable
echoInLine(is_writable($file));
// Check if readable
echoInLine(is_readable($file));
// Get filesize
echoInLine(filesize($file).'bites');
// Create a directory
echoInLine(mkdir('testng'));
// Remove dir if empty
echoInLine(rmdir('testng'));
// Copy file
echoInLine(copy($file,'2_3.txt'));
// Rename file
echoInLine(rename('2_3.txt','renamed2_3.txt'));
// Delete file
echoInLine(unlink('renamed2_3.txt'));
// Write from file to string
echoInLine(file_get_contents($file));
// Write string to file (replace)
echoInLine(file_put_contents('text.txt', 'Goodbye World'));
// Write string to file (apend)
echoInLine(file_put_contents('text.txt', file_get_contents('text.txt'). 'apended'));
// Open file for reading
$handleR = fopen('text.txt','r');
$data = fread($handleR, filesize('text.txt'));
echoinLine($data);
fclose($handleR);
// Open file for writing
$handleW = fopen('text.txt','w');
$txt = "John Doe\n";
fwrite($handleW, $txt);
$txt = "Doe John\n";
fwrite($handleW, $txt);
fclose($handleW);