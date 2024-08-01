const auth = require('../config/firebaseConfig.js')
const Brevo = require('@getbrevo/brevo');
const sendWelcomeEmail = require('../controllers/emailService.js')




const Login = async(req,res) => {

const { email, password } = req.body;

  try {
    // Authenticate user
    const userRecord = await auth.getUserByEmail(email);
    const token = await auth.createCustomToken(userRecord.uid);

    await sendWelcomeEmail(email);

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send('Error logging in user');
  }
};

const Signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    
    const userRecord = await auth.createUser({ email, password });
    console.log('Successfully created new user:', userRecord.uid);

    
    await sendWelcomeEmail(email);

    res.status(201).send('User created and email sent');
  } catch (error) {
    console.error('Error creating new user:', error);
    res.status(500).send('Error creating user');
  }
};

module.exports = {Login,Signup};