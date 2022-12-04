const db= require('../configs/connectString')



const pgMovies = {
    addFavorite:async(idMovie,idUSer)=>{
        const rs = await db.one(
            'INSERT INTO "FAVORITES"("IDUSER", "IDMOVIE" ) VALUES($1, $2) RETURNING *',
            [idMovie,idUser]
        );
        return rs;
    },
    allMovies: async () => {
        try {
            const rs = await db.any('SELECT * FROM "MOVIES"');
            return rs;
        } catch (err) {
            console.log(err);
        }
    },
    moviesSorted: async()=>{
        try {
            const rs = await db.any('SELECT * FROM "MOVIES" ORDER BY "RATIING" DESC, "TOPRANK" ASC');
            return rs;
        } catch (err) {
            console.log(err);
        }
    
    },
    findReviews:async(search)=>{
        try {
            const rs = await db.any(`SELECT * FROM "REVIEWS" WHERE "IDMOVIE" = $1`, [search]);
            console.log(rs);
            return rs;
        } catch (err) {
            console.log(err);
        }
    },
    findMovieByiD: async (search) => {
        try {
            const rs = await db.one(`SELECT * FROM "MOVIES" WHERE "ID" = $1`, [search]);
            console.log(rs);
            return rs;
        } catch (err) {
            console.log(err);
        }
    },
    
    findMovie: async (search) => {
        try {
            const rs = await db.any(`SELECT * FROM "MOVIES" WHERE "TITLE" LIKE '%${search}%'`);
            console.log(rs);
            return rs;
        } catch (err) {
            console.log(err);
        }
    },
    findCastsByMovie:async(search)=>{
        try {
            const rs = await db.any(`SELECT * FROM "CASTS_OF_MOVIES" WHERE "IDMOVIE" = $1` ,[search]);
            console.log(rs);
            return rs;
        } catch (err) {
            console.log(err);
        }
    }

};

module.exports = pgMovies;
