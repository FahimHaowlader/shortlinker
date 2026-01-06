import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Pagination = ({ page, setPage, totalDocs }) => {
  // Assuming 12 items per page as per your calculation
  const totalPages = Math.ceil(totalDocs / 12);

  const getPageNumbers = () => {
    const pages = [];
    // Shows current page, one before, and one after
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const pageNumbers = getPageNumbers();

  // If there's only one page, don't show pagination
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-1 items-center justify-center my-5">
      <nav
        aria-label="Pagination"
        className="isolate inline-flex -space-x-px rounded-md shadow-sm bg-white dark:bg-card-dark"
      >
        {/* Previous Button */}
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-text-secondary ring-1 ring-inset ring-border-light dark:ring-border-dark hover:bg-primary/10 focus:z-20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <IoIosArrowBack className="text-[20px]" />
        </button>

        {/* First Page */}
        <button
          onClick={() => setPage(1)}
          className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 border-r border-border-light dark:border-border-dark ${
            page === 1
              ? "bg-primary text-white"
              : "text-text-secondary ring-1 ring-inset ring-border-light dark:ring-border-dark hover:bg-primary/10"
          }`}
        >
          1
        </button>

        {/* Start Ellipsis */}
        {pageNumbers[0] > 2 && (
          <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-text-secondary ring-1 ring-inset ring-border-light dark:ring-border-dark">
            ...
          </span>
        )}

        {/* Middle Pages */}
        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 ${
              page === num
                ? "bg-primary text-white"
                : "text-text-secondary ring-1 ring-inset ring-border-light dark:ring-border-dark hover:bg-primary/10"
            }`}
          >
            {num}
          </button>
        ))}

        {/* End Ellipsis */}
        {pageNumbers.length > 0 && pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
          <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-text-secondary ring-1 ring-inset ring-border-light dark:ring-border-dark">
            ...
          </span>
        )}

        {/* Last Page */}
        {totalPages > 1 && (
          <button
            onClick={() => setPage(totalPages)}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 ${
              page === totalPages
                ? "bg-primary text-white"
                : "text-text-secondary ring-1 ring-inset ring-border-light dark:ring-border-dark hover:bg-primary/10"
            }`}
          >
            {totalPages}
          </button>
        )}

        {/* Next Button */}
        <button
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-text-secondary ring-1 ring-inset ring-border-light dark:ring-border-dark hover:bg-primary/10 focus:z-20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <IoIosArrowForward className="text-[20px]" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;