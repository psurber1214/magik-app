var asyncHandler = require('express-async-handler')
var LettermenList = require('../model/lettermenListModel.js')
var auth = require('../middleware/auth.js')
//import Lettermen from '../model/lettermenModel.js'

// @desc    Fetch all players
// @route   GET /api/v1/lettermen
// @access  Private
const getLettermen = asyncHandler(async (req, res) => {
  console.log('getting Lettermen List')
  try {
    const lettermen = await LettermenList.find({})
    res.json(lettermen)
  } catch (e) {
    console.log(e)
  }
})

// @desc    Fetch one Letterman
// @route   GET /api/v1/lettermen/:id
// @access  Private
const getLettermanById = asyncHandler(async(req, res) => {
    console.log('getting Letterman by Id: '+ req.params.id)

    try { 
        const letterman = await LettermenList.findById(req.params.id)

        if(letterman){
            res.json(letterman)
        } else { 
            res.status(404).json({message: 'Letterman Not Found'})
        }
    } catch (e) {
        console.log(e)
    }
})


// @desc    Edit one Letterman
// @route   PUT /api/v1/lettermen/:id
// @access  Private
const editLetterman = asyncHandler(async (req, res) => {
    try {
      let {
        firstName,
        middleName,
        marriedName,
        lastName,
        participations,
        gradSemester,
        biography,
        comments,
        suffix,
        addresses,
        phoneNumbers,
        email,
        preferredName,
        spouse,
        classYear,
        gradYear,
        tmfid,
        specialPositions,
        awards,
        letterAwardStatuses,
        membershipTypes,
        membershipStatus,
        lastPaymentThrough,
        lastPaymentType,
        paid,
        paidLife,
        payments,
      } = req.body
  
      let memTypes = []
      membershipTypes.forEach((mt) => {
        memTypes.push(mt.mtype)
      })
  
      let paymentList = []
  
      payments.forEach((payment) => {
        if (payment.Payment_Date == null) {
          payment.Payment_Date = ''
        }
        paymentList.push({
          Payment_Date: payment.Payment_Date.toString(),
          Amount: payment.Amount,
          PaymentThrough_Code: payment.PaymentThrough_Code,
          PaymentType_Code: payment.PaymentType_Code,
          expires: '',
          Paid_By_Name: payment.Paid_By_Name,
          YearOfSeason: payment.YearOfSeason,
          Comments: payment.Comments,
          CHK_MO_BD4_CC4_Nos: payment.CHK_MO_BD4_CC4_Nos,
        })
      })
  
      const letterman = await Lettermen.findById(req.params.id)
  
      console.log('Letterman found- attempting to update! ')
  
      if (letterman) {
        letterman.firstName = firstName
        letterman.middleName = middleName
        letterman.lastName = lastName
        letterman.participations = participations
        letterman.biography = biography
        letterman.comments = comments
        letterman.gradSemester = gradSemester
        letterman.addresses = addresses
        letterman.phoneNumbers = phoneNumbers
        letterman.email = email
        letterman.preferredName = preferredName
        letterman.spouse = spouse
        letterman.classYear = classYear
        letterman.gradYear = gradYear
        letterman.tmfid = tmfid
        letterman.marriedName = marriedName
        letterman.specialPositions = specialPositions
        letterman.awards = awards
        letterman.letterAwardStatuses = letterAwardStatuses
        letterman.membershipTypes = memTypes
        letterman.membershipStatus = membershipStatus
        letterman.suffix = suffix
  
        if (lastPaymentThrough == null) lastPaymentThrough = ''
        letterman.lastPaymentThrough = lastPaymentThrough.toString()
        letterman.lastPaymentType = lastPaymentType
        letterman.paid = paid
        letterman.paidLife = paidLife
        letterman.payments = paymentList
  
        console.log('New Letterman looks like... ' + letterman)
  
        const editedLetterman = await letterman.save()
  
        res.json(editedLetterman)
      } else {
        res.status(404)
        throw new Error('Letterman not found')
      }
    } catch (e) {
      console.log(e)
    }
  })

// @desc    Makes all active users no longer active
// @route   GET /api/v1/lettermen/reset
// @access  Private
  const resetMembership = asyncHandler(async (req, res) => {
    console.log('resetting membership')
  
    const lettermen = await Lettermen.find({}).select({
      firstName: 1,
      lastName: 1,
      membershipStatus: 1,
      membershipTypes: 1,
      _id: 1,
      id: 1,
    })
  
    lettermen.forEach(async (letterman) => {
      try {
        if (letterman.membershipStatus == 'ACTIVE') {
          let lifeMember = false
          console.log(
            letterman.firstName + ' ' + letterman.lastName + ' is active!'
          )
  
          const lm = await Lettermen.findById(letterman._id)
  
          if (lm.membershipTypes) {
            lm.membershipTypes.forEach((mt) => {
              console.log(mt)
              if (mt == 'LIFE' || mt == 'life') {
                lifeMember = true
              }
            })
          }
  
          if (lifeMember) {
            console.log(
              letterman.firstName +
                ' ' +
                letterman.lastName +
                ' is a life member!'
            )
          } else {
            lm.membershipStatus = 'NON_ACTIVE'
          }
  
          lm.save()
        }
      } catch (e) {
        console.log(e)
      }
    })
  
    res.json(lettermen)
  })

// @desc    Creates a Letterman
// @route   POST /api/v1/lettermen/
// @access  Private
  const createLetterman = asyncHandler(async (req, res) => {
    try {
      let {
        firstName,
        middleName,
        marriedName,
        lastName,
        participations,
        gradSemester,
        biography,
        comments,
        addresses,
        phoneNumbers,
        email,
        preferredName,
        spouse,
        classYear,
        gradYear,
        tmfid,
        specialPositions,
        awards,
        letterAwardStatuses,
        membershipTypes,
        membershipStatus,
        lastPaymentThrough,
        lastPaymentType,
        paid,
        suffix,
        paidLife,
        payments,
      } = req.body
  
      let memTypes = []
      membershipTypes.forEach((mt) => {
        memTypes.push(mt.mtype)
      })
  
      membershipTypes = memTypes
  
      let paymentList = []
  
      payments.forEach((payment) => {
        if (payment.Payment_Date == null) {
          payment.Payment_Date = ''
        }
        paymentList.push({
          Payment_Date: payment.Payment_Date.toString(),
          Amount: payment.Amount,
          PaymentThrough_Code: payment.PaymentThrough_Code,
          PaymentType_Code: payment.PaymentType_Code,
          expires: '',
          Paid_By_Name: payment.Paid_By_Name,
          YearOfSeason: payment.YearOfSeason,
          Comments: payment.Comments,
          CHK_MO_BD4_CC4_Nos: payment.CHK_MO_BD4_CC4_Nos,
        })
      })
  
      payments = paymentList
  
      const NewLetterman = new Letterman({
        firstName,
        middleName,
        marriedName,
        lastName,
        participations,
        gradSemester,
        biography,
        comments,
        addresses,
        phoneNumbers,
        email,
        preferredName,
        spouse,
        classYear,
        gradYear,
        tmfid,
        specialPositions,
        awards,
        letterAwardStatuses,
        membershipTypes,
        membershipStatus,
        lastPaymentThrough,
        lastPaymentType,
        paid,
        paidLife,
        payments,
        suffix,
      })
  
      console.log('New Letterman Looks Like This: ')
      console.log(NewLetterman)
  
      const letterman = await NewLetterman.save()
      res.json(letterman)
    } catch (e) {
      console.log(e)
      res.Error('Error saving new letterman')
    }
  })

// @desc    Fetch one Letterman
// @route   GET /api/v1/lettermen/search/:terms
// @access  Private
const searchLettermen = asyncHandler(async(req, res) => {
  console.log('Searching for: '+ req.params.terms)

  searchTerms = req.params.terms

  try { 
      const lettermen = await LettermenList.find({lastName: searchTerms})

      console.log(lettermen)

      if(lettermen){
          res.json(lettermen)
      } else { 
          res.status(404).json({message: 'Lettermen Not Found'})
      }
  } catch (e) {
      console.log(e)
  }
})

module.exports = { getLettermen, getLettermanById, editLetterman, resetMembership, createLetterman, searchLettermen }