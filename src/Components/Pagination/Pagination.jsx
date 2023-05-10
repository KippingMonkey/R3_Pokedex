import React, { useEffect, useState } from 'react'

const Pagination = ({ pokemonsPerPage, pokemons, paginate}) => {
  
  const pageNumbers = [];
  const numberOfPages = Math.ceil(pokemons / pokemonsPerPage);
  const [activePage, setActivePage] = useState(1);

  for (let i = 1; i <= Math.ceil(pokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }
  
 
  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber);
    paginate(pageNumber);
  }

  const handlePreviousClick = (pageNumber) => {
    if (pageNumber > 1) {
      setActivePage(pageNumber - 1);
      paginate(pageNumber - 1);
    }
  }

  const handleNextClick = (pageNumber) => {
    if (pageNumber < numberOfPages.length) {
      setActivePage(pageNumber + 1);
      paginate(pageNumber + 1);
    }
  }

  // const getNumberOfPages = () => {
  // let pageNumbers = [];

  //   for (let i = 1; i <= Math.ceil(pokemons / pokemonsPerPage); i++) {
  //     pageNumbers.push(i);
  //   }
  //   setNumberOfPages(pageNumbers);
  // }

  // const RenderPagenumbers = () => {
  //   let pageNumbers = [];
  //   let pageNumbersSlice = [];

  //   for (let i = 1; i < numberOfPages.length + 1; i++) {
  //     pageNumbers.push(<a href="#pokemon-gallery"
  //       className={activePage === i ? "page-number active" : "page-number"}
  //       id={`page${i}`}
  //       onClick={() => handlePageClick(i)}>
  //       <span>{i}</span>
  //     </a>)
  //   }

  //   if (numberOfPages.length > 6) {
  //     if (activePage >= numberOfPages.length - 5) {
  //       pageNumbersSlice = pageNumbers.slice(numberOfPages.length - 6, numberOfPages.length);
  //     }
  //     else {
  //       pageNumbersSlice = pageNumbers.slice(activePage - 1, activePage + 5);
  //       pageNumbersSlice.push(<span className="dots">...</span>)
  //       pageNumbersSlice.push(<a href="#gallery"
  //         className="page-number"
  //         id={`page${numberOfPages.length}`}
  //         onClick={() => this.handlePageClick(numberOfPages.length)}>
  //         <span>{numberOfPages.length}</span>
  //       </a>)
  //     }
  //     if (activePage > 2) {
  //       pageNumbersSlice.unshift(<span className="dots">...</span>)
  //       pageNumbersSlice.unshift(<a href="#gallery"
  //         className="page-number"
  //         id={`page${1}`}
  //         onClick={() => this.handlePageClick(1)}>
  //         <span>{1}</span>
  //       </a>)

  //     }
  //     return pageNumbersSlice;
  //   }
  //   else {
  //     console.log("pageNumberSlice", pageNumbersSlice)

  //     return pageNumbers;
  //   }
  // }

  const Previous = () => {
    return (
    <a href="#pokemon-gallery"
      className={activePage === 1 ? "hidden" : "previous-page"}
      onClick={() => handlePreviousClick(activePage)}>
      <span>{activePage === 1 ? null : "<"}</span></a>
      );
  }

  const Next = () => {
    return (
    <a href="#pokemon-gallery"
      className={activePage === numberOfPages.length ? "hidden" : "next-page"}
      onClick={() => handleNextClick(activePage)} >
      <span>{activePage === numberOfPages.length ? null : ">"}</span></a>
      );
  }


  return (
    <>
      <div className="pagination">
        {/* <RenderPrevious/>
        <RenderPagenumbers/>
        <RenderNext/> */}
        <Previous/>
        <ul>
          {pageNumbers.map( number => (
            <li key={number}>
              <a href='!#' onClick={ () => handlePageClick(number)}>
                {number}
              </a>
            </li>
          ))}
        </ul>
        <Next/>
      </div>
    </>
  )
}

export default Pagination;
