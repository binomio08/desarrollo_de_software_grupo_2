document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe por defecto

    // Obtener los valores de correo electrónico y contraseña ingresados
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Aquí puedes realizar la validación de las credenciales
    // Por ejemplo, puedes comparar con credenciales fijas o hacer una llamada a un backend para autenticar

    // Ejemplo de validación básica
    if (email === 'adm@page.com' && password === 'adm1234') {
        // Redirigir al usuario a la página index.html dentro de la carpeta crud
        window.location.href = 'crud/index.html';
    } else {
        alert('Correo electrónico o contraseña incorrectos. Por favor, inténtelo de nuevo.');
    }
});