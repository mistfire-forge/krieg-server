export const sendError = (res, message) => {
    return res.json({
        success: false,
        errors: message,
    })
}
