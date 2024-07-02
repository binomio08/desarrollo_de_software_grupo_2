/* Este código selecciona el elemento del documento con el id "header" y le asigna un bloque de código HTML para construir una barra de navegación. El código HTML contiene una estructura de navegación típica de una barra de navegación de Bootstrap, con enlaces a diferentes páginas y un formulario de búsqueda.
El código se encarga de asignar el contenido HTML al elemento con el id "header", lo que resulta en la visualización de la barra de navegación en ese lugar dentro del documento HTML.
*/
document.getElementById(
  "header"
).innerHTML = ` <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <a class="navbar-brand" href="../index.html">Navbar</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="../index.html">Inicio <span class="sr-only">(current)</span></a>
                        </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0 mx-auto" id="search-form">
                        <input class="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Buscar"
                            id="search-input">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
                    </form>
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="../login.html"><i class="fas fa-user"></i> Iniciar Sesión</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="../cart.html"><i class="fas fa-shopping-cart"></i> Carrito</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        `;
        

// <div class="container">
//   <a class="navbar-brand" href="index.html">Navbar</a>
//   <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
//       aria-expanded="false" aria-label="Toggle navigation">
//       <span class="navbar-toggler-icon"></span>
//   </button>
//   <div class="collapse navbar-collapse" id="collapsibleNavId">
//       <ul class="navbar-nav me-auto mt-2 mt-lg-0">
//           <li class="nav-item">
//               <a class="nav-link active" href="index.html" aria-current="page">Home <span class="visually-hidden">(current)</span></a>
//           </li>
//           <li class="nav-item">
//               <a class="nav-link" href="#">Link</a>
//           </li>
//           <li class="nav-item dropdown">
//               <a class="nav-link dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">CRUD</a>
//               <div class="dropdown-menu" aria-labelledby="dropdownId">
//                   <a class="dropdown-item" href="productos.html">Produtos</a>
//                   <a class="dropdown-item" href="#">Action 2</a>
//               </div>
//           </li>
//       </ul>
//       <form class="d-flex my-2 my-lg-0">
//           <input class="form-control me-sm-2" type="text" placeholder="Search">
//           <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
//       </form>
//   </div>
// </div>
// </nav>
