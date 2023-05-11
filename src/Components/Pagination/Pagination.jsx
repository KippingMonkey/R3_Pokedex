import './Pagination.css';

const Pagination = ({ pokemonsPerPage, pokemons, paginate}) => {
  
  const pageNumbers = [];
  const numberOfPages = Math.ceil(pokemons / pokemonsPerPage);

  
  for (let i = 1; i <= numberOfPages; i++) {
    pageNumbers.push(i);
  }
 
  const handlePageClick = (pageNumber) => {
    paginate(pageNumber);
  }

  return (
    <>
      <div className="pagination">
        <ul className="page-list">
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