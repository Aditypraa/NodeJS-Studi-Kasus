const fs = require("fs");

// Membuat Folder Data Jika Belum Ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Membuat file contact.json jika Belum Ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// Menampilkan Semua Data di Contacts.json
const loadContacts = () => {
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

// Menampilkan detail Contact Berdasarkan Nama
const findContact = (nama) => {
  const contacts = loadContacts();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );
  return contact;
};

// Menimpa/Menulis FIle contacts.json dengan Data Baru
const saveContacts = (contacts) => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
};

// Menambah Data Contact Baru
const addContact = (contact) => {
  const contacts = loadContacts();
  contacts.push(contact);
  saveContacts(contacts);
};

// Cek nama Duplikat/Sudah Ada
const cekDuplikat = (nama) => {
  const contacts = loadContacts();
  return contacts.find((contact) => contact.nama === nama);
};

// Hapus Contact
const deleteContact = (nama) => {
  const contacts = loadContacts();
  const filteredContacts = contacts.filter((contact) => contact.nama !== nama);
  saveContacts(filteredContacts);
};

// Mengubah Contact
const updateContacts = (contactBaru) => {
  const contacts = loadContacts();

  // Hilangkan contact lama yang namannya sama dengan oldNama
  const filteredContacts = contacts.filter(
    (contact) => contact.nama !== contactBaru.oldNama
  );
  delete contactBaru.oldNama;
  filteredContacts.push(contactBaru);
  saveContacts(filteredContacts);
};

module.exports = {
  loadContacts,
  findContact,
  addContact,
  cekDuplikat,
  deleteContact,
  updateContacts,
};
