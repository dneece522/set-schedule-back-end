const { Profile, Course } = require('../models')
const cloudinary = require('cloudinary').v2

async function index(req, res) {
  try {
    const profiles = await Profile.findAll()
    res.json(profiles)
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}

async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const profile = await Profile.findByPk(req.params.id)
    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    profile.photo = image.url
    await profile.save()
    res.status(201).json(profile.photo)
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}

async function createCourse(req, res) {
  try {
    req.body.profileId = req.params.id
    const course = await Course.create(req.body)
    res.status(200).json(course)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  index,
  addPhoto,
  createCourse,
}
