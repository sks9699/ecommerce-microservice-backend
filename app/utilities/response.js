const successAction = (data, message = 'success') => {
    return { statusCode: 200, data, message }
}

const failAction = (statusCode = 400, data = null, message = 'Fail') => {
    return { statusCode, data, message }
}

module.exports = {successAction, failAction};