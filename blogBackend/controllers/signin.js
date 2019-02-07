const handleSignin = (req, res, bcrypt) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json('Incorrect form submission');
	}
};

module.exports = {
	handleSignin
};