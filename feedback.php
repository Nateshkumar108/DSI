<?php
$field_name = $_POST['cf_name'];
$field_email = $_POST['cf_email'];
 $field_subject= $_POST['cf_subject'];
 $field_message = $_POST['cf_message'];

$mail_to = 'info@digitalspacesinc.com';
$subject = 'Digital Space Inc contact'.$field_name;

$body_message = 'Name: '.$field_name."\n";
$body_message .= 'E-mail: '.$field_email."\n";
 $body_message .= 'Number: '.$field_subject."\n";
 $body_message .= 'Message: '.$field_message."\n";

$headers = 'From: '.$field_email."\r\n";
$headers .= 'Reply-To: '.$field_email."\r\n";       

$mail_status = mail($mail_to, $subject, $body_message, $headers);

if ($mail_status) { ?>
    <script language="javascript" type="text/javascript">
        alert('Thank you for contacting us. We will get back to you as soon as possible');
        window.location = 'index.html';
    </script>
<?php
}
else { ?>
    <script language="javascript" type="text/javascript">
        alert('Message failed');
        window.location = 'index.html';
    </script>
<?php
}
?>