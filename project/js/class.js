//final project code

//validate registration inputs
function validateRegistrationInputs() {
  if (document.forms["usersForm"]["name"].value == "") {
    alert("Se debe llenar el campo Nombre.");
    return false;
  }
  if (document.forms["usersForm"]["lastName"].value == "") {
    alert("Se debe llenar el campo Apellido.");
    return false;
  }
  if (document.forms["usersForm"]["address"].value == "") {
    alert("Se debe llenar el campo Dirección.");
    return false;
  }
  if (document.forms["usersForm"]["addressTwo"].value == "") {
    alert("Se debe llenar el campo Dirección 2.");
    return false;
  }

  var selectedValue = country.options[country.selectedIndex] ? country.options[country.selectedIndex].value : null;

  if (!selectedValue) {
    alert("Se debe seleccionar un País.");
    return false;
  }
  if (document.forms["usersForm"]["city"].value == "") {
    alert("Se debe llenar el campo Cuidad.");
    return false;
  }
  if (document.forms["usersForm"]["email"].value == "") {
    alert("Se debe llenar el campo Correo Electrónico.");
    return false;
  } if (document.forms["usersForm"]["password"].value == "") {
    alert("Se debe llenar el campo Contraseña.");
    return c;
  }
  //if every input is filled out then validate email input
  if (checkEmailFormat() == false) {
    return false;
  }
  if (emailValidation() == false) {
    return false;
  }
  //emailValidation();
  return true;

}

//validate email input
function checkEmailFormat() {

  var email = document.getElementById('email');
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (!filter.test(email.value)) {
    alert('Ingrese un correo electrónico válido.');
    email.focus;
    return false;
  }
}
//validate if email exists
function emailValidation() {
  // read users from the database
  const users = JSON.parse(localStorage.getItem('users'));

  const email = $('#email').val();


  if (users) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].email == email) {

        alert("El correo ingresado ya está en uso.");

        return false;


      }
    }

  }

}
//validate password input

//add new user
function addUser() {
  if (validateRegistrationInputs()) {


    const userName = $('#name').val();
    const userCountry = $('#country option:selected').text();
    const userLastName = $('#lastName').val();
    const userAddress = $('#address').val();
    const userAddressTwo = $('#addressTwo').val();
    const userCity = $('#city').val();
    const userEmail = $('#email').val();
    const userPassword = $('#password').val();


    //insert to a database
    let usersDb = JSON.parse(localStorage.getItem('users'));
    if (!usersDb) {
      usersDb = [];
    }
    const user = {
      email: userEmail,
      name: userName,
      country: userCountry,
      lastName: userLastName,
      address: userAddress,
      addressTwo: userAddressTwo,
      city: userCity,
      password: userPassword
    }
    usersDb.push(user);
    localStorage.setItem('users', JSON.stringify(usersDb));

    console.log(JSON.parse(localStorage.getItem('users')));
    alert("Se ha guardado el usuario correctamente.");
    window.location.href = 'http://cambalachefinal.net:8080/login.html';
  }
}

function validateLoginInputs() {

  if ($('#email').val() == "") {
    alert("Se debe ingresar un Correo Electrónico.");
    return false;
  } if ($('#password').val() == "") {
    alert("Se debe ingresar una Contraseña.");
    return false;
  }
  return true;
}

//validate login
function loginValidation() {
  if (validateLoginInputs()) {


    // read authors from the database
    const users = JSON.parse(localStorage.getItem('users'));
    //let select= document.getElementById("authors-list");
    const email = $('#email').val();
    const password = $('#password').val();
    let check = false;


    if (users) {

      for (var i = 0; i < users.length; i++) {
        if ((users[i].email == email) && (users[i].password == password)) {
          sessionStorage.setItem('user', JSON.stringify(users[i]));
          alert("Se ha ingresado sesión correctamente.");
          window.location.href = 'http://cambalachefinal.net:8080/dashboard.html';
          check = true;
          break;

        }
      }
      // renders the select authors-list with the authors found

    }
    if (check == false) {
      alert("El correo o contraseña no coinciden.");
    }



  }
}

//load name of user on screen
function loadUserNameLoggedIn() {
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (user) {
    document.getElementById('userNameLoggedIn').innerHTML = user.name;
  }
}



//check if an user is logged in
function checkUserLoggedIn() {
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user) {
    window.location.href = 'http://cambalachefinal.net:8080/login.html';
  } else {
    return user;
  }


}
//cerrar Sesion
function logOut() {
  sessionStorage.clear();
  alert("Se ha cerrado la sesión correctamente.");
  window.location.href = 'http://cambalachefinal.net:8080/login.html';
}


//validate new product inputs
function validateProductInputs() {
  if (document.forms["productsForm"]["name"].value == "") {
    alert("Se debe llenar el campo Nombre.");
    return false;
  }
  if (document.forms["productsForm"]["description"].value == "") {
    alert("Se debe llenar el campo Descripción.");
    return false;
  }
  if (document.forms["productsForm"]["image"].value == "") {
    alert("Se debe llenar el campo Imagen.");
    return false;
  }
  if (document.forms["productsForm"]["swap"].value == "") {
    alert("Se debe llenar el campo Busco.");
    return false;
  }
  if (isImage(document.forms["productsForm"]["image"].value)) { } else {
    alert("La imagen debe ser formato jpg, jpeg, png, svg");
    return false;
  }

  var selectedValue = category.options[category.selectedIndex] ? category.options[category.selectedIndex].value : null;

  if (!selectedValue) {
    alert("Se debe seleccionar una Categoría.");
    return false;
  }

  return true;

}

//validate URL image
function isImage(url) {
  return /\.(jpg|jpeg|png|svg)$/.test(url);
}

//add new product
function addProduct() {
  if (validateProductInputs()) {
    let currentUser = JSON.parse(sessionStorage.getItem('user'));

    const productName = $('#name').val();
    const productDescription = $('#description').val();
    const productImage = $('#image').val();
    const productSwap = $('#swap').val();
    const productCategory = $('#category option:selected').text();
   

    let currentProductID = JSON.parse(sessionStorage.getItem('product'));
    let productsDb = JSON.parse(localStorage.getItem('products'));
    if (!productsDb) {
      productsDb = [];
    }

    if (currentProductID) {//check if a product was selected
      //const index = productsDb.find(item => item.id === currentProduct.id);
      for (var i = 0; i < productsDb.length; i++) {
        if (productsDb[i].id == currentProductID) {
          productsDb[i].name = productName;
          productsDb[i].description = productDescription;
          productsDb[i].image = productImage;
          productsDb[i].swap = productSwap;
          productsDb[i].category = productCategory;
          break;
        }
      }




    } else {

      //insert to a database


      const product = {
        id: productsDb.length + 1,
        user: currentUser.email,
        name: productName,
        description: productDescription,
        image: productImage,
        swap: productSwap,
        category:productCategory

      }
      productsDb.push(product);

    }



    localStorage.setItem('products', JSON.stringify(productsDb));

    alert("Se ha guardado el producto correctamente.");
    window.location.href = 'http://cambalachefinal.net:8080/dashboard.html';
  }
}

//load dashboard products
function loadDashboardProducts() {
  const products = JSON.parse(localStorage.getItem('products'));
  //let select= document.getElementById("authors-list");
  let currentUser = JSON.parse(sessionStorage.getItem('user'));

  if (products) {
    let options = "";
    for (var i = 0; i < products.length; i++) {
      if (products[i].user == currentUser.email) {
        options += `<div class="col-lg-4 my-3 col-xs-6 col-sm-6 col-md-6">
                       
        <div class="row">
            <div class="col d-flex justify-content-end">
        
                <img class="border-img img-responsive rounded" src="${products[i].image}" alt="img">
            </div>
        
        
            <div class="col d-flex align-items-start flex-column">
                <div class="row">
                    <div class="col">
                        <a href="http://cambalachefinal.net:8080/detalle.html" onclick="saveCurrentProduct(${products[i].id});">${products[i].name}</a>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button class="greenbutton"
                            onclick="location.href='http://cambalachefinal.net:8080/productos.html';saveCurrentProduct(${products[i].id})">Editar</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col"><button class="redbutton"
                            onclick="deleteProduct(${products[i].id})">Eliminar</button>
                    </div>
                </div>
        
            </div>
        </div>
        </div>`;

      }
    }
    // renders the select authors-list with the authors found
    document.getElementById('rowProductsDashboard').innerHTML = options;
  }
}


//delete product
function deleteProduct(productsID) {
  //debugger
  let products = JSON.parse(localStorage.getItem('products'));
  for (var i = 0; i < products.length; i++) {
    if (products[i].id == productsID) {
      products.splice(i, 1);
      alert("Se ha eliminado el producto correctamente.");
      window.location.reload();
      break;

    }
  }

  localStorage.setItem('products', JSON.stringify(products));
}
function saveCurrentProduct(product) {
  sessionStorage.setItem('product', JSON.stringify(product));
}
function deleteCurrentProduct() {
  deleteCurrentCategory();
  sessionStorage.removeItem("product");
}
//check if product if being edited
function loadDataOfEditProduct() {

  let currentIDProduct = JSON.parse(sessionStorage.getItem('product'));

  if (currentIDProduct) {//check if a product was selected
    document.getElementById('title-name').innerHTML = "Editar Producto";//change value of h1
    let currentProduct = JSON.parse(localStorage.getItem('products'));//load all products
    for (var i = 0; i < currentProduct.length; i++) {
      if (currentProduct[i].id == currentIDProduct) {//compare id of product on list with id product of session storage
        $('#name').val(currentProduct[i].name);
        $('#description').val(currentProduct[i].description);
        $('#image').val(currentProduct[i].image);
        $('#swap').val(currentProduct[i].swap);
        $('#category').val(currentProduct[i].category);
        
        $("#category option:contains(" + currentProduct[i].category + ")").attr('selected', 'selected');


      }
    }




  }


}

//load information on product's detail
function loadProductInformation() {
  let currentIDProduct = JSON.parse(sessionStorage.getItem('product'));

  if (currentIDProduct) {//check if a product was selected

    let currentProduct = JSON.parse(localStorage.getItem('products'));//load all products
    for (var i = 0; i < currentProduct.length; i++) {
      if (currentProduct[i].id == currentIDProduct) {//compare id of product on list with id product of session storage

        document.getElementById('name').innerHTML = `<h1>${currentProduct[i].name}</h1> `;
        document.getElementById('userEmail').innerHTML = currentProduct[i].user;
        document.getElementById('category').innerHTML = currentProduct[i].category;
        document.getElementById('description').innerHTML = `<p>${currentProduct[i].description}</p>`;
        document.getElementById('image').innerHTML = `<img class="img-fluid" src="${currentProduct[i].image}" alt="img">`;
        document.getElementById('swap').innerHTML = `<p>${currentProduct[i].swap}</p>`;
      }
    }


  }
}
//load information(image,product name ,user name) on cambalaches' page
function loadCambalacheInformation() {
  let products = JSON.parse(localStorage.getItem('products'));
  let users = JSON.parse(localStorage.getItem('users'));
  let productsContainer = "";


  for (var i = 0; i < products.length; i++) {
    let userName;
    for (var y = 0; y < users.length; y++) {
      if (products[i].user == users[y].email)
        userName = users[y].name;
      break;
    }


    productsContainer += `<div class="col-4 my-3 col-xs-6 col-sm-6">
      <div class="row ">

          <div class="col justify-content-end d-flex">
            <a  href="http://cambalachefinal.net:8080/detalle.html" onclick="saveCurrentProduct(${products[i].id});">
              <img class="border-img img-responsive rounded img-fluid" src="${products[i].image}" alt="mountain">
            </a>
              
          </div>
          <div class="col flex-column align-items-start d-flex">
          <a  href="http://cambalachefinal.net:8080/detalle.html" onclick="saveCurrentProduct(${products[i].id});">
                  <h4 class="px-0 mx-0">${products[i].name}</h4>
              </a>
              <p class="px-0 mx-0">${userName}</p>
          </div>
      </div>
  </div>`;
  }
  document.getElementById('productsContainer').innerHTML = productsContainer;

}
//load information on home page
function loadRecentCambalaches() {
  let products = JSON.parse(localStorage.getItem('products'));
  let productsContainer = "";
  let productsContainerAdditional = "";
  let counter = 2;

  for (var i = products.length - 1; i >= 0; i--) {
    if (counter != 0) {
      counter--;
      productsContainer += `<div class="col-6 col-sm-6 col-xs-6">
      <a  href="http://cambalachefinal.net:8080/detalle.html" onclick="saveCurrentProduct(${products[i].id});">
    <img src="${products[i].image}" class=" w-50" alt="img">
    <p>${products[i].name}</p></a></div>`;
    } else {
      productsContainerAdditional += `<div class="col-6 col-sm-6 col-xs-6">
      <a  href="http://cambalachefinal.net:8080/detalle.html" onclick="saveCurrentProduct(${products[i].id});">
    <img src="${products[i].image}" class=" w-50" alt="img">
    <p>${products[i].name}</p></a></div>`;


    }
  }
  document.getElementById('productsContainer').innerHTML = productsContainer;
  document.getElementById('productsContainerAdditional').innerHTML = productsContainerAdditional;

}
//categories section             ----------------------------------------------------------------------------------------------------------
function saveCurrentCategory(category) {
  sessionStorage.setItem('category', JSON.stringify(category));
}
function deleteCurrentCategory() {
  sessionStorage.removeItem("category");
}

//delete category
function deleteCategory(categoryID) {
  //debugger
  let categories = JSON.parse(localStorage.getItem('categories'));
  for (var i = 0; i < categories.length; i++) {
    if (categories[i].id == categoryID) {
      categories.splice(i, 1);
      alert("Se ha eliminado la categoría correctamente.");
      window.location.reload();
      break;

    }
  }

  localStorage.setItem('categories', JSON.stringify(categories));
}
//load  product categories
function loadDashboardCategories() {
  const categories = JSON.parse(localStorage.getItem('categories'));
  //let select= document.getElementById("authors-list");


  if (categories) {
    let options = "";
    for (var i = 0; i < categories.length; i++) {

      options += `<div class="col-lg-4 my-3 col-xs-6 col-sm-6 col-md-6">
                       
        <div class="row">
            <div class="col d-flex justify-content-end">
        
                <img class="border-img img-responsive rounded" src="${categories[i].image}" alt="img">
            </div>
        
        
            <div class="col d-flex align-items-start flex-column">
                <div class="row">
                    <div class="col">
                        <a href="#">${categories[i].name}</a>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button class="greenbutton"
                            onclick="location.href='http://cambalachefinal.net:8080/categorias.html';saveCurrentCategory(${categories[i].id})">Editar</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col"><button class="redbutton"
                            onclick="deleteCategory(${categories[i].id})">Eliminar</button>
                    </div>
                </div>
        
            </div>
        </div>
        </div>`;


    }
    // renders the select authors-list with the authors found
    document.getElementById('rowCategoriesDashboard').innerHTML = options;
  }
}


//add new category
function addCategory() {
  if (validateCategoryInputs()) {

    const categoryName = $('#name').val();
    const categoryImage = $('#image').val();

    let currentCategoryID = JSON.parse(sessionStorage.getItem('category'));
    let categoriesDb = JSON.parse(localStorage.getItem('categories'));
    if (!categoriesDb) {
      categoriesDb = [];
    }

    if (currentCategoryID) {//check if a category was selected  
      for (var i = 0; i < categoriesDb.length; i++) {
        if (categoriesDb[i].id == currentCategoryID) {
          categoriesDb[i].name = productName;
          categoriesDb[i].image = productImage;
          break;
        }
      }
    } else {

      //insert to a database


      const category = {
        id: categoriesDb.length + 1,
        name: categoryName,
        image: categoryImage

      }
      categoriesDb.push(category);

    }
    localStorage.setItem('categories', JSON.stringify(categoriesDb));

    alert("Se ha guardado la categoria correctamente.");
    window.location.href = 'http://cambalachefinal.net:8080/dashboard-categorias.html';
  }
}
//validate category inputs
function validateCategoryInputs() {
  if (document.forms["categoryForm"]["name"].value == "") {//change id form in html
    alert("Se debe llenar el campo Nombre.");
    return false;
  }
  if (isImage(document.forms["categoryForm"]["image"].value)) { } else {
    alert("La imagen debe ser formato jpg, jpeg, png, svg");
    return false;
  }

  const categories = JSON.parse(localStorage.getItem('categories'));
  const name = $('#name').val();
  if (categories) {
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].name == name) {

        alert("La categoria ingresada ya está en uso.");
        return false;
      }
    }
  }

  return true;

}
//check if category if being edited
function loadDataOfEditCategory() {

  let currentIDCategory = JSON.parse(sessionStorage.getItem('category'));

  if (currentIDCategory) {//check if a product was selected
    document.getElementById('title-name').innerHTML = "Editar Categoría";//change value of h1
    let categories = JSON.parse(localStorage.getItem('categories'));//load all products
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].id == currentIDCategory) {//compare id of product on list with id product of session storage
        $('#name').val(categories[i].name);
        $('#image').val(categories[i].image);


      }
    }




  }


}

//load categories on home page
function loadRecentCategories() {
  let categories = JSON.parse(localStorage.getItem('categories'));
  let categoriesContainer = "";
  let categoriesContainerAdditional = "";
  let counter = 2;

  for (var i = categories.length - 1; i >= 0; i--) {
    if (counter != 0) {
      counter--;
      categoriesContainer += `<div class="col-6 col-sm-6 col-xs-6">
      <a  href="http://cambalachefinal.net:8080/dashboard-categorias.html" >
    <img src="${categories[i].image}" class=" w-50" alt="img">
    <p>${categories[i].name}</p></a></div>`;
    } else {
      categoriesContainerAdditional += `<div class="col-6 col-sm-6 col-xs-6 ">
      <a  href="http://cambalachefinal.net:8080/dashboard-categorias.html">
    <img src="${categories[i].image}" class=" w-50" alt="img">
    <p>${categories[i].name}</p></a></div>`;
      //onclick="saveCurrentProduct(${products[i].id});

    }
  }
  document.getElementById('categoriesContainer').innerHTML = categoriesContainer;
  document.getElementById('categoriesContainerAdditional').innerHTML = categoriesContainerAdditional;

}


function loadCategoriesSelect() {
  // read categories from the database
  const categories = JSON.parse(localStorage.getItem('categories'));
  if (categories) {
    let options =  `<option value="" disabled selected hidden>Categorías</option>`;
    for (var i = 0; i < categories.length; i++) {
      options += `<option value="${categories[i].id}">${categories[i].name}</option>`;

    }
    document.getElementById('category').innerHTML = options;
  }
}



