const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { body, validationResult, check } = require("express-validator");
const methodOverride = require("method-override");
const Contact = require("./model/contact");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

require("./utils/db");

const app = express();
const port = 3000;

// Setup Method Override
app.use(methodOverride("_method"));

// Setup EJS
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

// Halaman Home
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

// Halaman About
app.get("/about", (req, res) => {
  res.render("about", { title: "Halaman About", layout: "layouts/main" });
});

// Halaman Contact
app.get("/contact", async (req, res) => {
  //   Contact.find().then((contact) => {
  //     res.send(contact);
  //   });

  const contacts = await Contact.find();

  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main",
    contacts,
    msg: req.flash("msg"),
  });
});

//Halaman Form Tambah Data Contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Tambah Data Contact",
    layout: "layouts/main",
  });
});

// Process Tambah Data Contact
app.post(
  "/contact",
  [
    body("nama").custom(async (value) => {
      const duplikat = await Contact.findOne({ nama: value });
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
      res.render("add-contact", {
        title: "Tambah Data Contact",
        layout: "layouts/main",
        errors: errors.array(),
      });
    } else {
      // Contact.insertMany(req.body, (error, result) => {
      //   // Kirimkan Flash Message
      //   req.flash("msg", "Data Berhasil DiTambahkan!");
      //   res.redirect("/contact");
      // });

      Contact.insertMany(req.body)
        .then((result) => {
          req.flash("msg", "Data Berhasil DiTambahkan!");
          res.redirect("/contact");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
);

// Proses Delete Contact
// app.get("/contact/delete/:nama", async (req, res) => {
//   const contact = await Contact.findOne({ nama: req.params.nama });

//   // Jika Contact tidak ada
//   if (!contact) {
//     res.status(404);
//     res.send("<h1>404</h1>");
//   } else {
//     Contact.deleteOne({ _id: contact._id }).then((result) => {
//       req.flash("msg", "Data Contact berhasil DiHapus!");
//       res.redirect("/contact");
//     });
//   }
// });
app.delete("/contact", (req, res) => {
  Contact.deleteOne({ nama: req.body.nama }).then((result) => {
    req.flash("msg", "Data Contact berhasil DiHapus!");
    res.redirect("/contact");
  });
});

// Halaman Form Edit Contact
app.get("/contact/edit/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });

  res.render("edit-contact", {
    title: "Form Edit Contact",
    layout: "layouts/main",
    contact,
  });
});

// Proses Edit Data
app.put(
  "/contact",
  [
    body("nama").custom(async (value, { req }) => {
      const duplikat = await Contact.findOne({ nama: value });
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
      res.render("edit-contact", {
        title: "Form Edit Data Contact",
        layout: "layouts/main",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            nohp: req.body.nohp,
          },
        }
      ).then((result) => {
        // Flash Message
        req.flash("msg", "Data Contact Berhasil DiUbah!");
        res.redirect("/contact");
      });
    }
  }
);

// Halaman Detail Contact
app.get("/contact/:nama", async (req, res) => {
  //   const contact = findContact(req.params.nama);
  const contact = await Contact.findOne({ nama: req.params.nama });

  res.render("detailContact", {
    title: "Detail Contact",
    layout: "layouts/main",
    contact,
  });
});

app.listen(port, () => {
  console.log(`Mongo Contact App | Listening at http://localhost:${port}`);
});
