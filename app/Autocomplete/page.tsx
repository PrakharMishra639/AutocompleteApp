"use client";

import React, { useState, useCallback, useRef } from "react";
import axios, { AxiosError } from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { MdSearch } from "react-icons/md";

import { debounce } from "../components/debounce";
import LoadingSpinner from "../components/loading";
import ProductItem from "../components/productItem";
import { Product } from "../Types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const PAGE_LIMIT = parseInt(process.env.NEXT_PUBLIC_PAGE_LIMIT || "10", 10);

const Autocomplete: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [skip, setSkip] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const isFetchingRef = useRef<boolean>(false);

  const fetchResults = async (search: string, skipValue = 0) => {
    if (isFetchingRef.current || search.length < 2) {
      if (search.length < 2) {
        setResults([]);
        setHasMore(false);
      }
      return;
    }

    setLoading(true);
    isFetchingRef.current = true;
    setError("");

    try {
      const res = await axios.get<{ products?: Product[]; total?: number }>(
        API_URL,
        {
          params: { q: search, limit: PAGE_LIMIT, skip: skipValue },
        }
      );

      const fetchedProducts = res.data?.products ?? [];
      const total = res.data?.total ?? 0;

      if (skipValue === 0) {
        setResults(fetchedProducts);
      } else {
        setResults((prev) => [...prev, ...fetchedProducts]);
      }

      setHasMore(skipValue + PAGE_LIMIT < total);
      setSkip(skipValue + PAGE_LIMIT);
    } catch (err: unknown) {
      const error = err as AxiosError;
      setError(error?.message ?? "Something went wrong");
    } finally {
      isFetchingRef.current = false;
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(debounce(fetchResults, 500), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setSkip(0);
    setHasMore(true);
    debouncedSearch(val, 0);
  };

  const handleSelect = (product: Product) => {
    setQuery(product?.title ?? "");
    setResults([]);
    setSkip(0);
    setHasMore(false);
  };

  const handleReset = () => {
    setQuery("");
    setResults([]);
    setError("");
    setSkip(0);
    setHasMore(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const fetchMoreData = () => {
    if (!loading && hasMore) {
      fetchResults(query, skip);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-tr from-white via-blue-50 to-blue-100 flex items-start justify-center px-4 pt-10 sm:pt-16 md:pt-20">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-8">
        <div className="flex items-center justify-center gap-4 mb-6 text-blue-600">
          <MdSearch className="text-3xl sm:text-4xl" />
          <h1 className="text-2xl sm:text-3xl font-bold">Product Search</h1>
        </div>

        <div className="w-full relative">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Search products..."
              className="flex-grow px-5 py-3 text-gray-800 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm sm:text-base"
            />
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm font-semibold transition duration-200"
              aria-label="Reset search input"
              disabled={!query && results.length === 0 && !error}
            >
              Reset
            </button>
          </div>

          {error && (
            <p className="text-red-500 mt-2 text-sm text-center">{error}</p>
          )}

          {(results.length > 0 ||
            loading ||
            (query.length >= 2 && !loading)) && (
            <div
              id="scrollableDiv"
              className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-auto animate-fadeIn"
            >
              <InfiniteScroll
                dataLength={results.length}
                next={fetchMoreData}
                hasMore={hasMore}
                scrollableTarget="scrollableDiv"
                loader={
                  <div className="flex justify-center p-2">
                    <LoadingSpinner />
                  </div>
                }
                endMessage={
                  !loading && !hasMore && results.length > 0 ? (
                    <p className="p-2 text-center text-gray-500 text-sm">
                      No more results
                    </p>
                  ) : null
                }
              >
                {results.length === 0 && !loading ? (
                  <p className="text-center text-sm text-gray-500 p-2">
                    No products found
                  </p>
                ) : (
                  <ul>
                    {results.map((item) => (
                      <ProductItem
                        key={item.id}
                        product={item}
                        onSelect={handleSelect}
                      />
                    ))}
                  </ul>
                )}
              </InfiniteScroll>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Autocomplete;
