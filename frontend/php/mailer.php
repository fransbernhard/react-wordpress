<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $sender = filter_var(trim($_POST["form_email"]), FILTER_SANITIZE_EMAIL); // trim() strips any white space from beginning and end of the string

        $message = strip_tags($_POST["form_msg"]); // strip of all HTML and PHP tags

        if ( empty($message)) { // Check that data was sent to the mailer.
            http_response_code(400);
            echo "<h1>Oops! There was a problem with your submission. Please complete the form and try again.</h1>";
            exit;
        }

        $email = "me@magdalundberg.se";
        $recipient = "mimilundberg@icloud.com";
        $subject = "kontaktis";
        $body .= "Email: $sender\n\n";
        $body .= "Message: \n$message\n";
        $email_headers = "From: magdalundberg.se <$email>";

        $success = mail($recipient, $subject, $body, $email_headers);

        if ($success) {
            http_response_code(200); // Set a 200 (okay).
            echo "<h1>Thank You! Your message has been sent.</h1>";
        } else {
            http_response_code(500); // Set a 500 (internal server error).
            echo "<h1>Oops! Something went wrong and we couldn’t send your message.</h1>";
        }
    } else {
        http_response_code(403);
        echo "<h1>There was a problem with your submission, please try again.</h1>";
    }
?>
