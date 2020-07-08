<?php
    if (isset($_POST['submit'])){
        if (!empty($_POST['name']) && !empty($_POST['subject']) && !empty($_POST['email']) && !empty($_POST['message'])) {
            $destinatario = 'dayan3846@gmail.com';
            $name = $_POST['name'];
            $subject = $_POST['subject'];
            $email = $_POST['email'];
            $message = $_POST['message'];
            $phone = $_POST['phone'];
            $header = "From: " . $email . "\r\n";
            $header .= "Message sent from: chdayan.com" . "\r\n";
            $completeMessage = $message . "\nAtentamente: " . $name  . "\nPhone: " . $phone;
            $mail = mail($destinatario, $subject , $completeMessage ,$header);
            if ($mail) {
                echo "<script>alert('email sent successfully')</script>";
                echo "<script> setTimeout(\"location.href='index.html'\",1000)</script>";
            }
        }
    }
?> 