/* eslint-disable max-len */

const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require("./handler");

/*
routes.js: Memuat kode konfigurasi routing server, seperti menentukan path, method, dan handler yang digunakan.
*/
const routes = [
  {
    method: "POST",
    path: "/notes",
    handler: addNoteHandler,
    // options: {
    //   cors: {
    //     origin: ["*"],
    //   },
    // },
  },
  {
    method: "GET",
    path: "/notes",
    handler: getAllNotesHandler,
  },
  {
    method: "GET",
    path: "/notes/{id}",
    handler: getNoteByIdHandler,
  },
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: editNoteByIdHandler,
  },
  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
