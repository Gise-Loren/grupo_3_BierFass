let botonRegistro = document.querySelector(".submit");

window.addEventListener("load", () => {
    let formulario = document.querySelector('.formulario');
    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        let errores = [];

        let nombre = document.querySelector("#name");
        if (nombre.value == "") {
            errores.push("Olvidaste completar tu nombre");
            nombre.classList.add("is-invalid");

        } else if (nombre.value.length < 2) {
            errores.push("El nombre debe tener al menos 2 caracteres");
            nombre.classList.add("is-valid");

        } else {
            nombre.classList.add("is-valid");
            nombre.classList.remove("is-invalid");
        }

        let apellido = document.querySelector("#lastName");
        if (apellido.value == "") {
            errores.push("Olvidaste completar apellido");
            apellido.classList.add("is-invalid");

        } else if (nombre.value.length < 2) {
            errores.push("El nombre debe tener al menos 2 caracteres");
            apellido.classList.add("is-valid");

        } else {
            apellido.classList.add("is-valid");
            apellido.classList.remove("is-invalid");
        }

        let email = document.querySelector("#email");
        if (email.value == "") {
            errores.push("Debes ingresar tu email");
            email.classList.add("is-valid");

        } else {
            email.classList.add("is-valid");
            e.classList.remove("is-invalid");
        }

        let password = document.querySelector("#password");
        if (password.value.length < 8) {
            errores.push("Debes inresar una contraseña");
            password.classList.add("is-valid");

        } else if (password.value == "") {
            errores.push("El campo no puede estar vacio");
            password.classList.add("is-valid");
        }
        else {
            password.classList.add("is-valid");
            password.classList.remove("is-invalid");
        }
        let avatar = document.querySelector("#imagen");
        console.log(avatar);
        if (avatar.value == "") {
            errores.push("Olvidaste subir una imagen, que debe estar en formato .jpg, .jpeg, .gif, .png");
            avatar.classList.add("is-invalid");

        } else {
            avatar.classList.add("is-valid");
            avatar.classList.remove("is-invalid")
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