const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// Membuat Folder Data
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Membuat File Contact.json jika Belum ada
const filePath = "./data/contacts.json";
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf-8");
}

const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

const simpanContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };

  const contacts = loadContact();

  // Cek Duplicat
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(
      chalk.red.inverse.bold("Contact Sudah Terdaftar, Gunakan Nama Lain")
    );
    return false;
  }

  // Cek Email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("Email Tidak Valid"));
      return false;
    }
  }

  // Cek Nomer Hp
  if (!validator.isMobilePhone(noHP, "id-ID")) {
    console.log(chalk.red.inverse.bold("Nomor Hp Tidak Valid"));
    return false;
  }

  contacts.push(contact);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  console.log(chalk.green.inverse.bold("Terimah Kasih Sudah Memasukan Data."));
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.cyan.inverse.bold("Daftar Contacts : "));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} Tidak Ditemukan`));
    return false;
  }

  console.log(chalk.blue.inverse.bold(contact.nama));
  console.log(contact.noHP);

  if (contact.email) {
    console.log(contact.email);
  }
};

const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama} Tidak Ditemukan`));
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));
  console.log(chalk.green.inverse.bold(`${nama} : Berhasil Dihapus`));
};

module.exports = { simpanContact, listContact, detailContact, deleteContact };
