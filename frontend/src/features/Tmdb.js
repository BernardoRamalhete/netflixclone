const API_KEY = process.env.TMDB_KEY
const API_BASE = 'https://api.themoviedb.org/3'

const fetchTmbd = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    getBrowseList: async () => { 
        return [
            { 
                slug: 'originals',
                title: "Netflix's Originals",
                items: await fetchTmbd(`/discover/tv?with_network=213&api_key=${API_KEY}`)
            },
            { 
                slug: 'trending',
                title: "Popular on Netflix",
                items: await fetchTmbd(`/trending/all/week?with_network=213&api_key=${API_KEY}`)
            },
            { 
                slug: 'toprated',
                title: "Trending Now",
                items: await fetchTmbd(`/movie/top_rated?with_network=213&api_key=${API_KEY}`)
            },
            { 
                slug: "action",
                title: 'Action movies',
                items: await fetchTmbd(`/discover/movie?with_genres=28&with_network=213&api_key=${API_KEY}`)
            },
            { 
                slug: 'comedy',
                title: 'Comedy movies',
                items: await fetchTmbd(`/discover/movie?with_genres=35&with_network=213&api_key=${API_KEY}`)
            },
            { 
                slug: 'horror',
                title: 'Horror movies',
                items: await fetchTmbd(`/discover/movie?with_genres=27&with_network=213&api_key=${API_KEY}`)
            },
            { 
                slug: 'romance',
                title: 'Romance movies',
                items: await fetchTmbd(`/discover/movie?with_genres=10749&with_network=213&api_key=${API_KEY}`)
            },
            { 
                slug: 'documentary',
                title: 'Documentaries',
                items: await fetchTmbd(`/discover/movie?with_genres=99&with_network=213&api_key=${API_KEY}`)
            }
        ]
    },

    getMovieInfo: async (movieId, type) => {
        let info = {};

        if(movieId) {
            switch(type) {
                case 'movie':
                    info = await fetchTmbd (`/movie/${movieId}?api_key=${API_KEY}`)
                break;
                case 'tv':
                    info = await fetchTmbd (`/tv/${movieId}?api_key=${API_KEY}`)
                break;
                default:
                    info = null;
            }
        }

        return info
    }
}