const pgMovies=require('../models/pgMovies')
const pgCasts=require('../models/pgCasts')
const castController= {
    renderDetail:async(req,res,next)=>{
        const search=req.params.id
        const cast= await pgCasts.findCastByiD(search)
        const listIdMovies= await pgCasts.findMoviessByCast(search)
        let movies=[]
        listIdMovies.forEach(async(idx)=>{
            let movie=await pgMovies.findMovieByiD(idx.IDMOVIE)
            movies.push(movie)
        })
        return res.render("detailcast",{cast,movies})   
    }
    ,
    renderSearch: async(req,res,next)=> {
        const search=req.params.id 
        const casts= await pgCasts.findCasts(search)

        return res.render("searchcast",{casts})
    },
    findAll: async (req, res, next) => {
        try {
            const data = await pgCasts.allCasts();
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    search: (req,res,next)=>{
        try {
            const search=req.body.search
            return res.status(200).json({ result: "redirect", url: `/cast/${search}` });
        }
        catch (err){
            console.log(err)
        }
    }
}
module.exports = castController