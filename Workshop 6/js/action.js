

function collectData() {
    var datosClientes = [];
    datosClientes[0] = document.getElementById("fname").value;
    datosClientes[1] = document.getElementById("lname").value;
    datosClientes[2] = document.getElementById("pnumber").value;
    return datosClientes
}
function setData(datosClientesActual) {
    var objetosClientes = { nombre: datosClientesActual[0], apellido: datosClientesActual[1], numero: datosClientesActual[2] };
    var todosDatosClientes = updateArray();
    todosDatosClientes.push(objetosClientes);

    localStorage.setItem('datosClientes', JSON.stringify(todosDatosClientes));
    clearInputs();
    alert("Se han guardado los datos correctamente.");

}
function getData() {
    var listarDatosClientes = localStorage.getItem('datosClientes');
    return listarDatosClientes;

}
function updateArray() {
    //debugger;
    var todosDatosClientes=[];
    var datos =  JSON.parse(getData());
    for (var i in datos) {
        todosDatosClientes.push(datos[i]);
    }
    return todosDatosClientes;
}
function showData() {
    console.log('Lista Clientes: ', JSON.parse(getData()));
}

function clearInputs() {
    document.getElementById('fname').value = "";
    document.getElementById('lname').value = "";
    document.getElementById('pnumber').value = "";

}