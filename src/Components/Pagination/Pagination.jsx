import React, { useState } from 'react'


const Pagination = ({ productsPerPage, totalProducts, paginate}) => {

  const [activePage, setActivePage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(getPageNumbers());
  let pageNumbers = [];
  
  handlePageClick = (pageNumber) => {
    setActivePage(pageNumber);
    paginate(pageNumber);
  }

  handlePreviousClick = (pageNumber) => {
    if (pageNumber > 1) {
      setActivePage(pageNumber - 1);
      paginate(pageNumber - 1);
    }
  }

  handleNextClick = (pageNumber) => {
    if (pageNumber < numberOfPages.length) {
      setActivePage(pageNumber + 1);
      paginate(pageNumber + 1);
    }
  }

  const getPageNumbers = () => {
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  const renderPagenumbers = () => {
    var pageNumbers = [];
    var pageNumbersSlice = [];

    for (let i = 1; i < numberOfPages.length + 1; i++) {
      pageNumbers.push(<a href="#pokemon-gallery"
        class={activePage === i ? "page-number active" : "page-number"}
        id={`page${i}`}
        onClick={() => this.handlePageClick(i)}>
        <span>{i}</span>
      </a>)
    }

    if (numberOfPages.length > 6) {
      if (activePage >= numberOfPages.length - 5) {
        pageNumbersSlice = pageNumbers.slice(numberOfPages.length - 6, numberOfPages.length);
      }
      else {
        pageNumbersSlice = pageNumbers.slice(activePage - 1, activePage + 5);
        pageNumbersSlice.push(<span class="dots">...</span>)
        pageNumbersSlice.push(<a href="#gallery"
          className="page-number"
          id={`page${numberOfPages.length}`}
          onClick={() => this.handlePageClick(numberOfPages.length)}>
          <span>{numberOfPages.length}</span>
        </a>)
      }
      if (activePage > 2) {
        pageNumbersSlice.unshift(<span class="dots">...</span>)
        pageNumbersSlice.unshift(<a href="#gallery"
          className="page-number"
          id={`page${1}`}
          onClick={() => this.handlePageClick(1)}>
          <span>{1}</span>
        </a>)

      }
      return pageNumbersSlice;
    }
    else {
      return pageNumbers;
    }
  }

  renderPrevious = () => {
    return (<a href="#pokemon-gallery"
      class={activePage === 1 ? "hidden" : "previous-page"}
      onClick={() => handlePreviousClick(activePage)}>
      <span>{activePage === 1 ? null : "<"}</span></a>);
  }

  renderNext = () => {
    return (<a href="#gallery"
      class={activePage === numberOfPages.length ? "hidden" : "next-page"}
      onClick={() => handleNextClick(activePage)} >
      <span>{activePage === numberOfPages.length ? null : ">"}</span></a>);
  }


  return (
    <>
      <div class="pagination">
        {renderPrevious()}
        {renderPagenumbers()}
        {renderNext()}
      </div>
    </>
  )
}

export default Pagination;
