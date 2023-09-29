const {
  addBookHandler,
  viewBooksHandler,
  detailBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler, // Mengambil function addBookHandler dari file handler.js
  },
  {
    method: "GET",
    path: "/books",
    handler: viewBooksHandler, // Mengambil function viewBooksHandler dari file handler.js
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: detailBookByIdHandler, //Mengambil function detailBookByIdHandler dari file handler.js
  },
  {
    method: "PUT",
    path: "/books/{id}",
    handler: editBookByIdHandler, //Mengambil function editBookByIdHandler dari file handler.js
  },
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteBookByIdHandler, //Mengambil function deleteBookByIdHandler dari file handler.js
  },
];

module.exports = routes;
