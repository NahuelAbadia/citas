import React, { Fragment, useState } from 'react';
// import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

const Formulario = ({ crearCita }) => {

    // Crear State de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: '',
    });

    const [error, actualizarError] = useState(false)

    // Funcion que se ejecuta cada ves que un usuario escribe en un input
    const actualizarState = e => { //la e es un evento, en este caso es onChange
        //console.log(e.target.value); //e.tagert.name nos permite saber en que campo estamos escribiendo. e.target.value nos permite saber que estamos escribiendo
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    // Aplico destructuring para extraer los valores para no tener que escribir cita.mascota y asi con c/u
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    // Cuando el usuario presiona agregar o enviar
    const submitCita = e => {
        e.preventDefault(); //previene la accion por default

        // Validacion

        // Realizo una comparacion diciendo que si los lo que traiga trim (devuelve una cadena de texto) es igual a un string vacio que no deje enviar el formulario

        if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            // console.log('Hay un error')
            actualizarError(true)
            return;
        }
        // Eliminar mensaje de error
        actualizarError(false);

        // Asignar un ID . Instalo uuid con npm i en la terminal para generar un id unico. ANDA MAL el uuid.
        
        // Poner una funcion random para generar un id. Math.floor() redondea el numero para arriba, haciendo de un float un int.
        cita.id = Math.floor(Math.random()*(500-1)+1);

        // Crear la cita
        crearCita(cita); // Invoca a lo que esta en App.js

        // Reiniciar el form

        // Uso el modificador del state para reiniciar el formulario
        actualizarCita({ 
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: '',
        })

    }

    return (
        <Fragment>
            <h2>Crear cita</h2>
            {/* Si error es verdadero entonces se muestra un cartel en pantalla con una clase de skeleton, sino no muestra nada */}
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre de la Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre del dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre del Dueño de la Mascota"
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Síntomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary">
                    Agregar cita</button>
            </form>
        </Fragment>
    )
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario