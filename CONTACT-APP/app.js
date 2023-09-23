const yargs = require("yargs");
const {
  simpanContact,
  listContact,
  detailContact,
  deleteContact,
} = require("./contacts.js");

yargs
  .command({
    command: "add",
    describe: "Menambahkan contact baru",
    builder: {
      nama: {
        describe: "Nama Lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noHP: {
        describe: "Nomor Handphone",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      simpanContact(argv.nama, argv.email, argv.noHP);
    },
  })
  .demandCommand();

// Menampilkan Daftar Semua Nama dan No Hp Contact
yargs.command({
  command: "list",
  describe: "Menampilkan Nama Dan NoHP",
  handler() {
    listContact();
  },
});

// Menampilkan Detail Sebuah Contact
yargs.command({
  command: "detail",
  describe: "Menampilkan Detail Contact",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    detailContact(argv.nama);
  },
});
// Menampilkan Daftar Semua Nama dan No Hp Contact
yargs.command({
  command: "list",
  describe: "Menampilkan Nama Dan NoHP",
  handler() {
    listContact();
  },
});

// Menghapus Contact Berdasarkan Nama
yargs.command({
  command: "delete",
  describe: "Menghapus Contact Berdasarkan Nama",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    deleteContact(argv.nama);
  },
});

yargs.parse();
