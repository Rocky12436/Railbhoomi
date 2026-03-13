// Input validation middleware
const validateInput = {
  // Validate email format
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate password strength
  password: (password) => {
    return password && password.length >= 6;
  },

  // Sanitize string input
  sanitizeString: (str) => {
    if (typeof str !== 'string') return '';
    return str.trim().replace(/[<>]/g, '');
  },

  // Validate complaint data
  complaint: (req, res, next) => {
    const { name, email, complaint } = req.body;
    
    if (!name || !complaint) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name and complaint are required' 
      });
    }

    if (email && !validateInput.email(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email format' 
      });
    }

    // Sanitize inputs
    req.body.name = validateInput.sanitizeString(name);
    req.body.complaint = validateInput.sanitizeString(complaint);
    if (email) req.body.email = validateInput.sanitizeString(email);

    next();
  },

  // Validate user registration
  register: (req, res, next) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and password are required' 
      });
    }

    if (!validateInput.email(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email format' 
      });
    }

    if (!validateInput.password(password)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters long' 
      });
    }

    // Sanitize inputs
    req.body.name = validateInput.sanitizeString(name);
    req.body.email = validateInput.sanitizeString(email);

    next();
  }
};

module.exports = validateInput;