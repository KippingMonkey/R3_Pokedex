import './Pagination.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ pokemonsPerPage, pokemons, currentPage, paginate}) => {
  
  const pageNumbers = [];
  const numberOfPages = Math.ceil(pokemons / pokemonsPerPage);

  
  for (let i = 1; i <= numberOfPages; i++) {
    pageNumbers.push(i);
  }
 
  const handlePageClick = (pageNumber) => {
    paginate(pageNumber);
  }

  const handlePreviousClick = (page) => {
    if (page > 1) {
      paginate(page - 1);
    }
  };

  return (
    <>
      <div className="pagination">
        <ul className="page-list">
        <li className="previous-page-list-item">
            <button
              onClick={() => handlePreviousClick(currentPage)}
              disabled={currentPage === 1}
              className="page-number"
            >
              <FaChevronLeft className='page-list-item' />
            </button>
          </li>
          {pageNumbers.map( number => (
            <li key={number} className="page-list-item">
              <a href='!#' onClick={ () => handlePageClick(number)} className="page-number">
                {number}
              </a>
            </li>
            ))}
        </ul>
      </div>
    </>
  )
}

export default Pagination;