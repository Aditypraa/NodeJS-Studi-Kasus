const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://aditypraa:aditypraa@localhost:27017/wpu?authSource=admin"
);

// // Menambah 1 Data
// const contact1 = new Contact({
//   nama: "H Maimuna",
//   nohp: "082312123",
//   email: "maimuna@gmail.com",
// });

// // Simpan Ke Collection
// contact1.save().then((contact) => console.log(contact));
