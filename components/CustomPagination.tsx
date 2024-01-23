"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React from "react";
import Pagination from "react-js-pagination";

interface Props {
  resPerPage: number;
  filteredRoomsCount: number;
}

let queryParams;

const CustomPagination = ({ resPerPage, filteredRoomsCount }: Props) => {
  const searchParams = useSearchParams();
  let page = searchParams.get("page") || 1;
  page = Number(page);
  const router = useRouter()

  const handlePageChange = (currentPage: number) => {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search)
      if (queryParams.has("page")) {
        queryParams.set("page", currentPage.toString())
      } else {
        queryParams.append("page", currentPage.toString())
      }

      const path = `${window.location.pathname}?${queryParams.toString()}`;
      router.push(path)
    }
  };

  return (
    <div className="d-flex justify-content-center pt-3">
      {resPerPage < filteredRoomsCount && (
        <Pagination
          activePage={page}
          itemsCountPerPage={resPerPage}
          totalItemsCount={filteredRoomsCount}
          onChange={handlePageChange}
          nextPageText={"Next"}
          prevPageText={"Prev"}
          firstPageText={"First"}
          lastPageText={"Last"}
          itemClass="page-item"
          linkClass="page-link"
        />
      )}
    </div>
  );
};

export default CustomPagination;
