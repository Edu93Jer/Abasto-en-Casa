const User = require( '../models/User')

exports.profileGet = async ( req, res ) => {
 const { _id } = req.user
 const profile = await User.findById( _id ).populate( 'orders' )
 res.status( 200 ).json({ profile })
}

exports.profileEdit = async ( req, res ) => {
 const { _id } = req.user
 const profile = await User.findByIdAndUpdate( _id , { $set: { ...req.body }}, { new: true })
 res.status( 200 ).json({ profile })
}

exports.profileDel = async ( req, res ) => {
 const { _id } = req.user
 const profile = await User.findByIdAndDelete( _id )
 res.status( 200 ).json({ profile })
}