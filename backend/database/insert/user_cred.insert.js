const bcrypt = require('bcryptjs')
const isEmpty = require('is-empty')


/**
 * 
 * @param {*} firstname 
 * @param {*} lastname 
 * @param {*} email 
 * @param {*} password 
 * @param {*} database 
 * @returns {errors, isValid} 
 */
module.exports = (firstname, lastname, email, password, database) => {
    let errors = {}

    // Needs refactoring, I need to combine these two queries into one.
    // Insert followed by another insert using the returning id generated from the first insert
    bcrypt.genSalt(10).then(salt => {
        bcrypt.hash(password, salt).then(hash => {
            // First insert
            database.query(`INSERT INTO users (firstname, lastname, email)
                            VALUES ($1, $2, $3)
                            RETURNING id;` , [firstname, lastname, email]).then(result => {

                                // Second insert
                                database.query(`INSERT INTO creds (userid, password)
                                                VALUES ($1, $2);`, [result.rows[0].id, hash]).then(() => {
                                                    return {
                                                        errors,
                                                        isValid: isEmpty(errors)
                                                    }

                                                }).catch(err => {
                                                    errors.databaseerror = err
                                                    return {
                                                        errors,
                                                        isValid: isEmpty(errors)
                                                    }
                                                })
                            }).catch(err => {
                                errors.databaseerror = err
                                return {
                                    errors,
                                    isValid: isEmpty(errors)
                                }
                            })
        }).catch(err => {
            errors.bcrypterror = err
            return {
                errors,
                isValid: isEmpty(errors)
            }
        })

    }).catch(err => {
        errors.bcrypterror = err
        return {
            errors,
            isValid: isEmpty(errors)
        }
    })
}