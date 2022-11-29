let botonRegistro = document.querySelector(".submit");

window.addEventListener("load", () => {
    let formulario = document.querySelector('.formulario');
    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        let errores = [];

       
        let email = document.querySelector("#email");
        if (email.value == "") {
            errores.push("Debes ingresar tu email");
            email.classList.add("is-valid");

        } else {
            email.classList.add("is-valid");
            email.classList.remove("is-invalid");
        }

        let password = document.querySelector("#password");
        if (password.value.length < 8) {
            errores.push("La contraseña es incorrecta");
            password.classList.add("is-valid");

        } else if (password.value == "") {
            errores.push("El campo no puede estar vacio");
            password.classList.add("is-valid");
        }
        else {
            password.classList.add("is-valid");
            password.classList.remove("is-invalid");
        }
        if (errores.length > 0) {
            let ulErrores = document.querySelector("div.errores ul");

            for (let i = 0; i < errores.length; i++) {

                ulErrores.innerHTML += '<li>' + errores[i] + '</li>'
            }

        } else {
            alert('Tu cuenta se ha creado correctamente!');

            formulario.submit();
        }


    })
})