const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const newName = process.argv[3];
const newNumber = process.argv[4];

const url = `mongodb+srv://fullstackopen:${password}@cluster0.pkfgroh.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", contactSchema);

if (process.argv.length === 3) {
  mongoose
    .connect(url)
    .then((result) => {
      console.log("Phonebook:");
      Contact.find({}).then((result) => {
        result.forEach((contact) => {
          console.log(`${contact.name} ${contact.number}`);
        });
        mongoose.connection.close();
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

if (process.argv.length === 5) {
  mongoose
    .connect(url)
    .then((result) => {
      const contact = new Contact({
        name: newName,
        number: newNumber,
      });
      return contact.save();
    })
    .then(() => {
      console.log(`Added ${newName} number: ${newNumber} to the phonebook`);
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
}
