const pgMovies=require('../models/pgMovies')
const pgCasts=require('../models/pgCasts')
const movieController= {
    
    render: async(req,res,next)=>{
        try {
          const movies=await pgMovies.moviesSorted();
          let moviess=[]
          for (let i=0;i<10;i++){
            moviess[i]=movies[i]
          }
          return res.render("home",{moviess})
        }
        catch(err){
            console.log(err)
        }
    },
    addFavorite:async(req,res,next)=>{
        try {
        const id=req.params.id
        const idUser=req.session.uid
        const rs=await pgMovies.addFavorite(id,idUser) 
        
    }
    catch(err){
        console.log(err)
    }

    },
    renderDetail:async(req,res,next)=>{
        const search=req.params.id
        const movie= await pgMovies.findMovieByiD(search)
        const listCasts=await pgMovies.findCastsByMovie(search)  
        let casts=[]
        listCasts.forEach(async(index)=>{
            const cast = await pgCasts.findCastByiD(index.IDCAST)
            casts.push(cast)
        })
        let detail=''
        if(movie?.SYNOPSES) {
            detail = JSON.parse(movie.SYNOPSES)
        }
        return res.render("detailmovie",{movie,genres:movie?.GENRES||'không có',casts,detail})   
    }
    ,
    renderReview:async(req,res,next)=>{
        const search=req.params.id
        const movie= await pgMovies.findMovieByiD(search)
        const reviews=await pgMovies.findReviews(search)
        return res.render("reviewmovie",{movie,reviews}) 
    },
    renderSearch: async(req,res,next)=> {
        const search=req.params.id 
        const movies= await pgMovies.findMovie(search)

        return res.render("searchmovie",{movies})
    },
    findAll: async (req, res, next) => {
        try {
            const data = await pgMovies.allMovies();
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    search: (req,res,next)=>{
        try {
            const search=req.body.search
            return res.status(200).json({ result: "redirect", url: `/movie/${search}` });
        }
        catch (err){
            console.log(err)
        }
    }
}
module.exports = movieController