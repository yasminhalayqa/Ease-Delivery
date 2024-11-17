import db from "../models/index.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const Login = async (req, res) => {
    const { password, email } = req.body

    try {
        const user = await db.Users.findOne({ where: { email } })
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' })
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const { id, name, role_id, store_id, salesman_id } = user
        const token = jwt.sign({ userID: user.id }, 'T', { expiresIn: '1h', algorithm: 'HS256' })
        res.status(200).json({ id, role_id, name, store_id, salesman_id, token: token })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}