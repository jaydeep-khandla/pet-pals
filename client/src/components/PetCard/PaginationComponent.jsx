import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <Button variant="outline" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      <span>
        {currentPage} of {totalPages}
      </span>
      <Button variant="outline" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PaginationComponent;
