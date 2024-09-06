function sendEmail(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    // Get form values
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;

    // Clear previous error messages
    document.getElementById("errorName").style.display = "none";
    document.getElementById("errorEmail").style.display = "none";
    document.getElementById("errorSubject").style.display = "none";
    document.getElementById("errorMessage").style.display = "none";

    // Validate form inputs
    let isValid = true;
    if (name === "") {
        document.getElementById("errorName").style.display = "block";
        isValid = false;
    }

    // General email format validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === "" || !emailPattern.test(email)) {
        document.getElementById("errorEmail").style.display = "block";
        isValid = false;
    }

    if (subject === "") {
        document.getElementById("errorSubject").style.display = "block";
        isValid = false;
    }
    if (message === "") {
        document.getElementById("errorMessage").style.display = "block";
        isValid = false;
    }

    // If validation fails, return
    if (!isValid) return;

    let params = {
        name: name,
        email: email,
        subject: subject,
        message: message,
    };

    emailjs.send("service_dmz6r0o", "template_g2wlgva", params)
    .then(() => {
        // Show success message in a SweetAlert popup
        swal({
            title: "Thank you!",
            text: "Your message has been successfully sent!",
            icon: "success",
            button: "Close",
        });

        // Clear form fields
        document.getElementById("contactForm").reset();
    })
    .catch((error) => {
        console.error("Error sending email:", error);
    });
}
