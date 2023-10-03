const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const {
  loadContacts,
  findContact,
  addContact,
  cekDuplikat,
  deleteContact,
  updateContacts,
} = require("./utils/contacts");
const { body, validationResult, check } = require("express-validator");

const app = express();
const port = 4000;

// View Engine : EJS
app.set("view engine", "ejs");

app.use(expressLayouts); // Third-party Middleware
app.use(express.static("public")); // Build-in Middleware
app.use(express.urlencoded({ extended: true })); // Build-in Middleware

// Konfigurasi Flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.get("/", (req, res) => {
  // res.sendFile("./index.html", { root: __dirname });
  const mahasiswa = [
    {
      nama: "Aditya Pratama",
      email: "aditypraa@gmail.com",
    },
    {
      nama: "Sugeng",
      email: "sugeng@gmail.com",
    },
    {
      nama: "Slamet Riadi",
      email: "slametriadi@gmail.com",
    },
  ];

  res.render("index", {
    nama: "Aditya Pratama",
    title: "Halaman Home",
    mahasiswa,
    layout: "layouts/main",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "Halaman About", layout: "layouts/main" });
});

app.get("/contact", (req, res) => {
  const contacts = loadContacts();

  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main",
    contacts,
    msg: req.flash("msg"),
  });
});

// Tambah Data Contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Tambah Data Contact",
    layout: "layouts/main",
  });
});

// Process Data Contact
app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error("Nama Contact Sudah Digunakan!");
      }
      return true;
    }),
    check("email", "Email Tidak Valid").isEmail(),
    check("nohp", "No Handphone Tidak Valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("add-contact", {
        title: "Tambah Data Contact",
        layout: "layouts/main",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);

      // Flash Message
      req.flash("msg", "Data Berhasil DiTambahkan!");

      res.redirect("/contact");
    }
  }
);

// Proses Delete Contact
app.get("/contact/delete/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  // Jika Contact tidak ada
  if (!contact) {
    res.status(404);
    res.send("<h1>404</h1>");
  } else {
    deleteContact(req.params.nama);
    req.flash("msg", "Data Contact berhasil DiHapus!");
    res.redirect("/contact");
  }
});

// Halaman Form Edit Contact
app.get("/contact/edit/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  res.render("edit-contact", {
    title: "Form Edit Contact",
    layout: "layouts/main",
    contact,
  });
});

// Proses Edit Data
app.post(
  "/contact/update",
  [
    body("nama").custom((value, { req }) => {
      const duplikat = cekDuplikat(value);
      if (value !== req.body.oldNama && duplikat) {
        throw new Error("Nama Contact Sudah Digunakan!");
      }
      return true;
    }),
    check("email", "Email Tidak Valid").isEmail(),
    check("nohp", "No Handphone Tidak Valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("edit-contact", {
        title: "Form Edit Data Contact",
        layout: "layouts/main",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      updateContacts(req.body);
      // Flash Message
      req.flash("msg", "Data Contact Berhasil DiUbah!");
      res.redirect("/contact");
    }
  }
);

// Detail Contact
app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  res.render("detailContact", {
    title: "Detail Contact",
    layout: "layouts/main",
    contact,
  });
});

app.use((req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
