<?php
require 'class.phpmailer.php';

$name 	= $_POST['name'];
$email 	= $_POST['email'];
$phone 	= $_POST['phone'];
$city 	= $_POST['city'];

$html = '<h3>Contact Form Received</h3>'
		.'<ul>'
		.'<li><b>Name</b>: '. $name .'</li>'
		.'<li><b>Email</b>: '. $email .'</li>'
		.'<li><b>City</b>: '. $city .'</li>'
		.'<li><b>Phone</b>: '. $phone .'</li>'
		.'</ul>';

$mail = new PHPMailer;

$mail->From = 'info@mydomain.com';
$mail->FromName = $name;
$mail->addReplyTo($email);
$mail->addAddress('info@mydomain.com', 'Admin');     // Add a recipient

$mail->WordWrap = 50;// Set word wrap to 50 characters
$mail->isHTML(true);// Set email format to HTML

$mail->Subject = 'Contact Form received from the web.';
$mail->Body    = $html;
$mail->AltBody = strip_tags($html);

$result = array( "message"=>"", "email"=>$html, "error"=>true );
if(!$mail->send()) {
    $result['message'] = 'Message could not be sent.';
} else {
	$result['message'] = 'Message has been sent. Thank you, we will call you';
	$result['error'] = false;
}

header('Content-Type:application/json');
echo json_encode($result);