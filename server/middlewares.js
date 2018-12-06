function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) next()
  else next({ status: 403, message: 'Unauthorized' })
}

function checkId(idField) {
  return (req,res,next) => {
    let id = req.params[idField]
    if (!mongoose.Types.ObjectId.isValid(id)) {
      // 400 = Bad Request
      next({ status: 400, message: 'Wrong id' })
    }
    else {
      next()
    }
  }
}

module.exports = {
  isLoggedIn , checkId
}

