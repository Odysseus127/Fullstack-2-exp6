import React from "react";

function Pagination({
    currentPage,
    totalPages,
    first,
    last,
    onPageChange
}) {
    return (
        <div className="pagination">

            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={first}
            >
                Previous
            </button>

            <span>
                Page {currentPage + 1} of {totalPages}
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={last}
            >
                Next
            </button>

        </div>
    );
}

export default Pagination;