import '../styles/BrowseListRow.css'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import {useState} from 'react'

function BrowseListRow({title, items, functionOnClick}) {

    const [listScroll, setListScroll] = useState(0) 

    const handleLeftArrow = () => { 
        let x = listScroll + Math.round(window.innerWidth / 2);
        
        if (x>0) {

            x = 0;

        }

        setListScroll(x)
    }
    
    const handleRightArrow = () => { 
        let x = listScroll - Math.round(window.innerWidth / 2);
        let listWidth = items.results.filter((item) => (item.poster_path !== null)).length * 160;

        if((window.innerWidth - listWidth) > x) { 
            x = (window.innerWidth - listWidth) - 60
        }

        setListScroll(x)
    }

  return (
      <>
        <div className="ListRowBody">

            <h2 className="listRow__title">{title}</h2>

            <div className="listRow__left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{fontSize: 50}}/>
            </div>
            
            <div className="listRow__right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{fontSize: 50}}/>
            </div>

            <div className="listRow__list-area">

                <div className="listRow__list" style={{
                        marginLeft: listScroll,
                        width: items.results.length * 160
                    }}>

                    {items.results.length > 0 && items.results.filter((item) => (item.poster_path !== null)).map((item, key)=> (
                        
                        <div key={key} className="listRow__movie-poster" >

                            <span href="https://www.netflix.com.br" onClick={() => functionOnClick(item)}>
                                <img src={ `https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title} className="listRow__img"/>
                            </span>

                        </div>
                    ))}
                    
                </div>
            </div>

        </div>
      </>
  )
}

export default BrowseListRow