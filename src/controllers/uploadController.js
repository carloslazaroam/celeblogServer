const multer = require('multer')

const storage = multer.diskStorage({
  
    destination: function (req, file, cb) {
      //console.log(file);
      cb(null, `src/images/${req.body.folder}`)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage }).single('image')
module.exports = { upload}
 


