const { Schema, model } = require("mongoose");
const {
  handleSchemaValidationErrors,
  handleDBValidation,
} = require("../hooks");
const { mongooseContactsSchema } = require("../schemas");

const contactSchema = new Schema(...mongooseContactsSchema);

contactSchema.pre("findOneAndUpdate", handleDBValidation);

contactSchema.post("save", handleSchemaValidationErrors);

contactSchema.post("findOneAndUpdate", handleSchemaValidationErrors);

const Contact = model("contact", contactSchema);

module.exports = Contact;
