const mongoose = require('mongoose')

const LettermenSchema = mongoose.Schema(
  {
    tmfid: {
      type: Number,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    preferredName: {
      type: String,
    },
    suffix: {
      type: String,
    },
    marriedName: {
      type: String,
    },
    spouse: {
      type: String,
    },
    gradYear: {
      type: Number,
    },
    gradSemester: {
      type: String,
      enum: ['Fall', 'Spring', 'Summer'],
    },
    classYear: {
      type: Number,
    },
    addresses: [
      {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: Number },
        country: { type: String },
        label: { type: String },
      },
    ],
    phoneNumbers: [
      {
        number: { type: Number },
        label: { type: String },
        extension: { type: Number },
      },
    ],
    email: {
      type: String,
    },
    participations: [
      {
        sport: String,
        role: String,
        years: [
          {
            year: { type: Number },
            lettered: { type: Boolean },
            jerseyNumber: { type: String },
            dateOrdered: { type: Date },
            datePickedUp: { type: Date },
          },
        ],
      },
    ],

    specialPositions: [
      {
        position: { type: String },
        year: { type: Number },
      },
    ],
    lettermenAwardStatuses: [
      {
        letterAwardStatus: { type: String },
      },
    ],
    letterAwardStatuses: [
      {
        letterAwardStatus: { type: String },
      },
    ],
    awards: [{ name: { type: String }, year: { type: Number } }],
    letters: [
      {
        sport: { type: String },
        season: { type: String },
        coach: { type: String },
        comment: { type: String },
      },
    ],
    membershipStatus: {
      type: String,
      // enum: [
      //   "ACTIVE",
      //   "DEEASED",
      //   "IN_SCHOOL",
      //   "NO_CURR_ADD",
      //   "NON_ACTIVE",
      //   "NOT_ELIGIBLE",
      //   "UNK",
      // ],
    },
    membershipTypes: [
      {
        type: String,
        // type: { type: String },
        // enum: ["ASSOC", "DUAL", "HON", "RGRAD", "LIFE", "SENIOR", "ACTIVE"],
      },
    ],
    //memeTypes: [{ type: { type: String } }],
    lastPaymentThrough: {
      type: String,
    },
    lastPaymentType: {
      type: String,
    },
    yearEligible: {
      type: Number,
    },
    paid: {
      type: Boolean,
    },
    paidLife: {
      type: Boolean,
    },
    biography: {
      type: String,
    },
    comments: {
      type: String,
    },
    payments: [
      {
        Payment_Date: { type: Date },
        Amount: { type: Number },
        PaymentThrough_Code: { type: String },
        PaymentType_Code: { type: String },
        expires: { type: Date },
        Paid_By_Name: { type: String },
        YearOfSeason: { type: Number },
        Comments: { type: String },
        CHK_MO_BD4_CC4_Nos: { type: String },
      },
    ],
  },
  // { collection: "lettermen-dev" } tthis is for the deployed Mongo Instance
  { collection: 'lettermen' }
)

//module.exports = mongoose.model("lettermen-dev", LettermenSchema); this is the correct one for the deployed Mongo
module.exports = mongoose.model('lettermen', LettermenSchema)
