import {db} from "../db.js"

export const getUsers = (_, res) => {
    const q = "SELECT * FROM usuarios"

    db.query(q, (err, data) => {
        if (err) {
            console.error(err)
            return res.status(500).send("Error getting users")
        } else {
            return res.status(200).json(data)
        }
    })
}

export const addUser = (req, res) => {
    const q =
    "INSERT INTO usuarios (`nome`, `email`, `fone`, `data_nascimento`) VALUES (?)"

    const values = [
        req.body.nome,
        req.body.email,
        req.body.fone,
        req.body.data_nascimento
    ]
    
    db.query(q, [values], (err) => {
        if (err) {
            console.error(err)
            return res.status(500).send("Error adding user")
        } else {
            return res.status(201).send("User added successfully")
        }
    })
}

export const updateUser = (req, res) => {
    const q =
    "UPDATE usuarios SET `nome`=?, `email`=?, `fone`=?, `data_nascimento`=? WHERE id=?"

    const values = [
        req.body.nome,
        req.body.email,
        req.body.fone,
        req.body.data_nascimento,
    ]
    
    db.query(q, [...values, req.params.id], (err) => {
        if (err) {
            console.error(err)
            return res.status(500).send("Error updating user")
        } else {
            return res.status(200).send("User updated successfully")
        }
    })
}

export const deleteUser = (req, res) => {
    const q = "DELETE FROM usuarios WHERE id = ?"

    db.query(q, [req.params.id], (err) => {
        if (err) {
            console.error(err)
            return res.status(500).send("Error deleting user")
        } else {
            return res.status(200).send("User deleted successfully")
        }
    })
}