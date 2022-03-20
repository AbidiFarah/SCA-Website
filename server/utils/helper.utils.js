exports.sendError = (res ,stat ,error) => {
    res.status(stat).json({success: false, error})
}
