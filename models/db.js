const movies = require('../db/movies.json')
const casts = require('../db/casts.json')

const db= require('../configs/connectString')
const config=require('../configs/config')
const dbJson = {

    addDataFromJson: ()=>{
        try {
            movies.forEach(async(movie)=>{
                // const check = await config.isExist(movie.id,"MOVIES","ID")
                // if (check===[]) {
                db.one(
                    'INSERT INTO "MOVIES"("ID", "IMG", "TITLE", "YEAR", "TOPRANK", "RATIING", "RATINGCOUNT","GENRES","SYNOPSES") VALUES($1, $2, $3, $4, $5, $6, $7,$8,$9) RETURNING *',
                    [movie.id, 
                    movie.img, 
                    movie.title, 
                    movie.year, 
                    movie.topRank, 
                    movie.rating, 
                    movie.ratingCount,
                    movie.genres?movie.genres.toString():'',
                    movie.synopses?JSON.stringify(movie.synopses):'']
                );
                
            })
            casts.forEach(async(cast)=>{
                const check = await config.isExist(cast.id,"CASTS","ID")
                // if (check===[])
                db.one(
                    'INSERT INTO "CASTS"("ID", "IMG", "LEGACYNAMETEXT", "NAME", "BIRTHDATE", "BIRTHPLACE", "GENDER","HEIGHTCENTIMETERS","NICKNAMES","REALNAME") VALUES($1, $2, $3, $4, $5, $6, $7,$8,$9,$10) RETURNING *',
                    [cast.id,
                    cast.image,
                    cast.legacyNameText,
                    cast.name,
                    cast.birthDate,
                    cast.birthPlace,
                    cast.gender,
                    cast.heightCentimeters,
                    cast.nicknames?cast.nicknames.toString():'',cast.realName]
                );
            })
            
            movies.forEach((movie)=>{
                let reviews=movie.reviews
                reviews.forEach(async(rv)=>{
                    const check1 = await config.isExist(movie.id,"MOVIES","ID")
                    // if (check1!==[])
                    db.one(
                        'INSERT INTO "REVIEWS"("IDMOVIE", "AUTHOR", "AUTHORRATING", "HELPFULNESSSCORE", "INTERESTINGVOTES", "LANGUAGECODE", "REVIEWTEXT","REVIEWTITLE","SUBMISSIONDATE") VALUES($1, $2, $3, $4, $5, $6, $7,$8,$9) RETURNING *',
                        [movie.id,rv.author,rv.authorRating,rv.helpfulnessScore,rv.interestingVotes?.toString(),rv.languageCode,rv.reviewText,rv.reviewTitle,rv.submissionDate]
                    );
                })
                casts.forEach(cast=>{
                    movie.casts.forEach(async(cha)=>{
                        if(cha.id===cast.id) {
                            const check1 = await config.isExist(movie.id,"MOVIES","ID")
                            const check2 = await config.isExist(cast.id,"CASTS","ID")
                            // if (check1!==[] && check2!==[])
                            db.one(
                                'INSERT INTO "CASTS_OF_MOVIES"("IDMOVIE", "IDCAST") VALUES($1, $2) RETURNING *',
                                [movie.id,cast.id]
                            );
                        }
                    })
                    
                })
            })
        } catch (err)
        {
            console.log(err)
        }
    },

    
}
module.exports= dbJson
