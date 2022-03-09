import '../styles/Browse.css'
import Tmdb from '../features/Tmdb'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useEffect, useState, useRef} from 'react'
import {useLocation} from 'react-router-dom'
import BrowseListRow from '../components/BrowseListRow'
import BrowseHeader from '../components/BrowseHeader'



function Browse() {

  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector((state) => state.auth)
  const {profile} = location.state

  const [movieList, setMovieList] = useState([])
  const [featuredMovie, setFeaturedMovie] = useState(null)
  const [blackHeaderValue, setBlackHeaderValue] = useState(false)
  const [activeMovie, setActiveMovie] = useState(null)
  const [displayControl, setDisplayControl] = useState(false)
  

  let isFirstRender = useRef(true);

  const getMovieList = async () => {
    if(isFirstRender.current) {
      isFirstRender.current = false
      setMovieList(await Tmdb.getBrowseList())
    } 
  }

  getMovieList()

  useEffect(() => {

    
    const getMovie = async () => { 

      if(movieList.length > 0) {
        
        let netflixOriginals = movieList.filter(movie => movie.slug === 'originals');
        let filteredNetflixOriginals = netflixOriginals[0].items.results.filter(atualItem => atualItem.backdrop_path !== null)
        let choseRandom = Math.floor(Math.random() * filteredNetflixOriginals.length)
        let featured = filteredNetflixOriginals[choseRandom];
        let featuredInfo = await Tmdb.getMovieInfo(featured.id, 'tv')
        setFeaturedMovie(featuredInfo);
  
      }

    }

    if(user.user == null) {
      
      return 
      
    } else {

      getMovie();
      
    }
      
  }, [user, movieList])

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeaderValue(true)
      } else {
        setBlackHeaderValue(false)
      }
    }
    
    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  },[])

  useEffect(() => {
    if(user.user == null) {
      
      navigate('/login')
      
    }
  }, [user, navigate])

  const getYear = (value) => {
    let year = new Date (value)
    return year.getFullYear()
  }

  const getGenres = (array) => {
    let genres = []

    for(let i in array) {
      genres.push(array[i].name)
    }

    return genres
  }

  const modalControl = () => {
    setDisplayControl(false)
  }
  
  const handlePosterClick = async (movie) => {    
    setActiveMovie(movie)
  }

  useEffect(() => {
    if(activeMovie != null) {
      setDisplayControl(true)
    }
  }, [activeMovie])
  
  return (
    <>
      <div className="BrowseBody">

        <BrowseHeader blackHeader={blackHeaderValue} profile={profile}/>

        {
          featuredMovie !== null &&
        <section className="featured__section" style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`
        }}>
          
          <div className="featured__vertical-gradient">

            <div className="featured__horizontal-gradient">

              <div className="featured__title">

              {featuredMovie.name}

              </div>

              <div className="featured__info-container">

                <div className="featured__info-rate">
                  {featuredMovie.vote_average} rating 
                </div>

                <div className="featured__info-year">
                  {getYear(featuredMovie.first_air_date)}
                </div>

                <div className="featured__info-seasons">
                  {featuredMovie.number_of_seasons} season{featuredMovie.number_of_seasons !== 1 ? 's' : '' }
                </div>

                <div className="featured__info-description">
                  {featuredMovie.overview} 
                </div>

                
                
                <div className="featured__info-genres">
                  <strong>Genre{getGenres(featuredMovie.genres).length > 1 ? 's' : ''}: </strong>{getGenres(featuredMovie.genres).join(", ")}
                </div>

              </div>

            </div>

          </div>


        </section>
        
        }
        
        <section className="list__section">

          {
          movieList.map((item, key) => (
            <div key={key}>
              <BrowseListRow title={item.title} items={item.items} functionOnClick={handlePosterClick}/>
            </div>
            ) 

          )}

        </section>

        {
        movieList <= 0 &&
        <div className="browse__loading">

              <img src="https://www.rchandru.com/images/portfolio/loading.gif" alt='loading'/>

        </div>
        }

      </div>
      {displayControl &&
        
        <div className="browse__activeMovie-body" onClick={modalControl}>

          <div className="browse__activeMovie-background">
            <div className="browse__activeMovie-container" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${activeMovie.backdrop_path})`}}>
              <div className="browse__activeMovie-cover-gradient">
                <div className="browse__activeMovie-general-info">

                  <section className="browse__activeMovie-info">
                    <div className="browse__activeMovie-mini-info">
                      <p className="browse__activeMovie-rating">{activeMovie.vote_average} rating</p>
                      <p className="browse__activeMovie-year">{activeMovie.first_air_date == undefined ? getYear(activeMovie.release_date) : getYear(activeMovie.first_air_date)}</p>
                    </div>
                    <h2 className="browse__activeMovie-title">{activeMovie.first_air_date == undefined ? activeMovie.title : activeMovie.name}</h2>
                    <p className="browse__activeMovie-overview">{activeMovie.overview}</p>
                  </section>

                </div>
              </div>
            </div>
          </div>
        </div>

        }
    </>
  )
}

export default Browse