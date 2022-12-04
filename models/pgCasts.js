const db= require('../configs/connectString')

const pgCasts = {
    
    allCasts: async () => {
        try {
            const rs = await db.any('SELECT * FROM "CASTS"');
            return rs;
        } catch (err) {
            console.log(err);
        }
    },

    findCastByiD: async (search) => {
        try {
            const rs = await db.one(`SELECT * FROM "CASTS" WHERE "ID" = $1`, [search]);
            console.log(rs);
            return rs;
        } catch (err) {
            console.log(err);
        }
    },
    
    findCasts: async (search) => {
        try {
            const rs = await db.any(`SELECT * FROM "CASTS" WHERE "NAME" LIKE '%${search}%'`);
            console.log(rs);
            return rs;
        } catch (err) {
            console.log(err);
        }
    },
    findMoviessByCast:async(search)=>{
        try {
            const rs = await db.any(`SELECT * FROM "CASTS_OF_MOVIES" WHERE "IDCAST" = $1` ,[search]);
            console.log(rs);
            return rs;
        } catch (err) {
            console.log(err);
        }
    }    

};

module.exports = pgCasts;
