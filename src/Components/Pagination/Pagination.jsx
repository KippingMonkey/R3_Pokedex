import './Pagination.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ pokemonsPerPage, pokemons, currentPage, paginate}) => {
  
  const pageNumbers = [];
  const numberOfPages = Math.ceil(pokemons / pokemonsPerPage);

  
  for (let i = 1; i <= numberOfPages; i++) {
    pageNumbers.push(i);
  }
 
  const handlePageClick = (pageNumber) => {
    console.log('Clicked page number:', pageNumber);
  paginate(pageNumber);
  currentPage = pageNumber;
  console.log('Current page after paginate:', currentPage);

  }

  const RenderPrevious = () => {
    if(currentPage !== 1){
      return(
        <li className="page-list-item">
                <div onClick={() => handlePreviousClick(currentPage)} className="page-number">
                  <FaChevronLeft style={{ color: 'blanchedalmond', fontSize: '1.05rem', backGroundColor:'#e49f6a', padding: '6px 2px 0 0' }} />
                </div>
        </li>
      ) 
    }
    else{ return(null)}
  }
  const handlePreviousClick = (page) => {
    if (page > 1) {
      paginate(page - 1);
    }
  };

  const RenderNext = () => {
    if(currentPage !== numberOfPages){
      return(
        <li className="page-list-item">
        <div onClick={() => handleNextClick(currentPage)} className="page-number previous-next-btn">
          <FaChevronRight style={{ color: 'blanchedalmond', fontSize: '1.05rem', backGroundColor:'#e49f6a', padding: '6px 0 0 2px' }} />
        </div>
      </li>
      ) 
    }
    else{ return(null)}
  }
  const handleNextClick = (page) => {
    if (page < numberOfPages) {
      paginate(page + 1);
    }
  };

  return (
    <>
      <div className="pagination">
        <ul className="page-list">
          <RenderPrevious />
          {pageNumbers.map( number => (
            <li key={number} className={number === currentPage ? "page-list-item active" : "page-list-item"}>
              <div onClick={ () => handlePageClick(number)} className="page-number">
                {number}
              </div>
            </li>
            ))}
         <RenderNext />
        </ul>
      </div>
    </>
  )
}

export default Pagination;