$(document).ready(function() {
    $('#loginForm').submit(function(event) {
        event.preventDefault();
        
        const email = $('#email').val();
        const password = $('#password').val();

        // FORM VALIDATION
        if (email.trim() === "" || password.trim() === "") {
            var dialog = document.getElementById('errorDialog');
            document.getElementById('errorMessage').textContent = 'Email dan password tidak valid! Harap masukkan email dan password yang valid.';
            dialog.style.display = 'block';
            return;
        }

        if (!isValidEmail(email)) {
            var dialog = document.getElementById('errorDialog');
            document.getElementById('errorMessage').textContent = 'Email yang dimasukkan harus mengandung unsur karakter @ dan .';
            dialog.style.display = 'block';
            return;
        }

        if (!isPasswordLengthValid(password)) {
            var dialog = document.getElementById('errorDialog');
            document.getElementById('errorMessage').textContent = 'Panjang password minimal 8 karakter.';
            dialog.style.display = 'block';
            return;
        }

        if (!isValidPassword(password)) {
            var dialog = document.getElementById('errorDialog');
            document.getElementById('errorMessage').textContent = 'Password harus mengandung alfabet (a-z), alfabet kapital (A-Z), angka (0-9), dan symbol.';
            dialog.style.display = 'block';
            return;
        }

        // AJAX REQUEST
        $.ajax({
            url: 'login_process.php',
            type: 'POST',
            dataType: 'json',
            data: $(this).serialize(),
            success: function(response) {
                if (response.success) {
                    window.location.href = "profile.php"; 
                } else {
                    var dialog = document.getElementById('errorDialog');
                    document.getElementById('errorMessage').textContent = 'Email atau password yang anda masukkan salah!';
                    dialog.style.display = 'block';
                }
            },
            error: function(xhr, status, error) {
                console.error("Error:", error); 
            }
        });

        
    });

    // EVENT LISTENER FOR CLOSE BTN
    document.getElementById('closeDialog').addEventListener('click', function () {
        document.getElementById('errorDialog').style.display = 'none';
    });

    //VALIDATE EMAIL FORMAT
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // VALIDATE PW LENGTH
    function isPasswordLengthValid(password) {
        return password.length >= 8;
    }

    // VALIDATE PW FORMAT
    function isValidPassword(password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    }

});