import jwt from "jsonwebtoken"
export default function checkToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado!' })
    }

    try {

        jwt.verify(token, 'bancodedados')
        const payload = jwt.decode(token)
        console.log(payload)
        next()

    } catch (error) {
        res.status(400).json({msg: "Token inválido"})
    }
}