function log (req,res,next){
    console.log('logging the action .....')
    next()
  }

module.exports = log