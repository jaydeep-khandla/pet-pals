import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    const visiblePageNumbers = [];
    const ellipsis = (
      <PaginationItem key="ellipsis">
        <PaginationEllipsis />
      </PaginationItem>
    );

    pageNumbers.forEach((number) => {
      if (number === 1 || number === totalPages || (number >= currentPage - 1 && number <= currentPage + 1)) {
        visiblePageNumbers.push(
          <PaginationItem key={number}>
            <PaginationLink onClick={() => onPageChange(number)} isActive={currentPage === number}>
              {number}
            </PaginationLink>
          </PaginationItem>
        );
      } else if ((number === currentPage - 2 && currentPage > 3) || (number === currentPage + 2 && currentPage < totalPages - 2)) {
        visiblePageNumbers.push(ellipsis);
      }
    });

    return visiblePageNumbers;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
