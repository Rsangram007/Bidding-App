const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Model/User.Model');


const hash = bcrypt.hash;
const compare = bcrypt.compare;

const createUser = User.createUser;
const getUserByEmail = User.getUserByEmail;
const getUserById = User.getUserById;

module.exports = {
  register: async (req, res) => {
    const { username, password, email, role } = req.body;

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const user = await createUser(
      username, 
      hashedPassword,
      email,
      role || "user"
    );
    res.status(201).json({ user });
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    // Validate password
    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send("Invalid email or password");
    }
    console.log("key",process.env.JWTSKEY)
    // Generate token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWTSKEY, {
      expiresIn: "1h",
    }); 
    
    res.json({ token ,user});
  },

  getUserProfile: async (req, res) => {
    const user = await getUserById(req.user.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json({ user });
  },
};
