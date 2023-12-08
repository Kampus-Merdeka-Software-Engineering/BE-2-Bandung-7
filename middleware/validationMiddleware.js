// validationMiddleware.js
const validateMessage = (req, res, next) => {
    const { name, email, message } = req.body;

    // Validate name
    if (!name || name.length < 2) {
        return res.status(400).json({
            success: false,
            message: "Name must be at least 2 characters and cannot be empty.",
        });
    }

    // Validate email using a basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid email address.",
        });
    }

    // Validate message
    if (!message) {
        return res.status(400).json({
            success: false,
            message: "Message cannot be empty.",
        });
    }

    // If all validations pass, proceed to the next middleware or route handler
    next();
};

module.exports = { validateMessage };
