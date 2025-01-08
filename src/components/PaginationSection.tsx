"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

const PaginationSection = ({
  currentPage,
  setCurrentPage,
  totalPages,
}: {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}) => {


  const generatePageNumber = () => {
    const page = [];
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(currentPage + 2, totalPages);

    if (totalPages > 5) {
      if (currentPage <= 3) {
        endPage = 5;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 4;
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      page.push(i);
    }
    return page;
  };
  // }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => handlePrevPage()} />
          </PaginationItem>

          {/* Loop through the pages within the calculated range */}
          {generatePageNumber().map((page) => (
            <PaginationItem
              key={page}
              className={`px-4 py-2 mx-2 bg-blue-500 text-white rounded-md ${
                currentPage === page ? "bg-blue-700" : "bg-blue-500"
              }`}
            >
              <PaginationLink onClick={() => setCurrentPage(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext onClick={() => handleNextPage()} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationSection;
