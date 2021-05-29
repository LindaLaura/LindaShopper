#!/usr/bin/env node

//bring up your db, models
// import data

const seed = async () => {
    await db.sync({force: true})
    //create models
    db.close()
    console.log(`
    Seeding successful!
    `)

}

seed().catch(err => {
    db.close()
    console.log(`
      Error seeding:
      ${err.message}
      ${err.stack}
    `)
})