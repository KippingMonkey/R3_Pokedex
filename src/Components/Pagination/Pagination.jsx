import './Pagination.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ pokemonsPerPage, pokemons, currentPage, paginate}) => {
  
  const pageNumbers = [];
  const numberOfPages = Math.ceil(pokemons / pokemonsPerPage);

  for (let i = 1; i <= numberOfPages; i++) {
    pageNumbers.push(i);
  }
 
  const RenderNumbers = () => {
    var pageNumbersSlice = [];
    var renderedNumbers = [];

    if (numberOfPages > 6) {
      if (currentPage >= numberOfPages - 5) {
        pageNumbersSlice = pageNumbers.slice(numberOfPages - 6, numberOfPages);
      }
      else {
        pageNumbersSlice = pageNumbers.slice(currentPage - 1, currentPage + 5);
        pageNumbersSlice.push(<span className="dots">...</span>)
        pageNumbersSlice.push(numberOfPages)
      }
      if (currentPage > 2) {
        pageNumbersSlice.unshift(<span className="dots">...</span>)
        pageNumbersSlice.unshift(1)
        
      }
      renderedNumbers = pageNumbersSlice;
    }
    else {
      renderedNumbers = pageNumbers;
    }
    return(
      renderedNumbers.map( (number, index) => (
        <li key={index} className={number === currentPage ? "page-list-item active" : "page-list-item"}>
          {number.type === "span" ?  
          <div className="page-number">
            {number}
          </div> :
          <div onClick={ () => handlePageClick(number)} className="page-number">
            {number}
          </div>
        }
        </li>
        ))
    )
  }
  const handlePageClick = (pageNumber) => {
  paginate(pageNumber);
  currentPage = pageNumber;
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
          <RenderNumbers/>
          <RenderNext />
        </ul>
      </div>
    </>
  )
}

export default Pagination;