import React, { useEffect, useState } from "react";
import QRModal from "../../components/QRModal";
import URLModal from "../../components/URLModal";
import ActionModal from "../../components/ActionModal";
import { FRONTEND_URL } from "../../utilis/constants";
import Loader from "../../components/Loader";
import DeleteModal from "../../components/DeleteModal";
import useStore from "../../store";
import Pagination from "../../components/Pagination";
import ActiveStatus from "../../components/ActiveStatus";

const URLs = () => {
  const { url, fetchUrl, page, limit, setPage, setLimit } = useStore();
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const LimitWords = ({ text = "", wordLimit }) => {
    const limitedText = React.useMemo(() => {
      if (!text) return "";
      const words = text.split("");
      return words.length > wordLimit
        ? words.slice(0, wordLimit).join("") + "..."
        : text;
    }, [text, wordLimit]);
    return <p className="max-w-lg break-words">{limitedText}</p>;
  };

  const refreshUrls = () => {
    setIsLoading(true);
    fetchUrl().then(() => setIsLoading(false));
  };

  useEffect(() => {
    const fetchAllData = async () => {
      await fetchUrl();
      setIsLoading(false);
    };
    fetchAllData();
  }, [page, limit]);

  const handleOpenUrlModal = (urlData) => {
    setSelectedUrl(urlData);
    setIsUrlModalOpen(true);
  };

  const handleOpenActionModal = (urlData) => {
    setSelectedUrl(urlData);
    setIsActionModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsUrlModalOpen(false);
    setIsActionModalOpen(false);
    setSelectedUrl(null);
  };

  const handleSearch = (e) => {
    const value = e.target.value;

    // Clear any previous timer
    if (handleSearch.timeoutId) {
      clearTimeout(handleSearch.timeoutId);
    }

    // Set a new timer
    handleSearch.timeoutId = setTimeout(() => {
      fetchUrl(value);
    }, 500); // 500ms debounce
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        URL Management
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-between max-w-md gap-2">
            <input
              type="text"
              placeholder="Search URLs..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearch}
            />
          </div>
          <button
            onClick={refreshUrls}
            className="py-2 px-2 bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white rounded-lg cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#FFFFFF"
            >
              <path d="M482-160q-134 0-228-93t-94-227v-7l-64 64-56-56 160-160 160 160-56 56-64-64v7q0 100 70.5 170T482-240q26 0 51-6t49-18l60 60q-38 22-78 33t-82 11Zm278-161L600-481l56-56 64 64v-7q0-100-70.5-170T478-720q-26 0-51 6t-49 18l-60-60q38-22 78-33t82-11q134 0 228 93t94 227v7l64-64 56 56-160 160Z" />
            </svg>
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center w-full pt-7">
            <Loader
              height={"h-10"}
              width={"w-10"}
              color={"text-gray-200"}
              bgColor={"fill-black"}
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Original URL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Short URL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clicks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    QR Code
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {url.data &&
                  url.data.map((item) => (
                    <tr key={item.urlId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <LimitWords text={item.redirectURL} wordLimit={20} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                        <a
                          href={`${FRONTEND_URL}/link/${item.shortId}`}
                          className="text-blue-500 hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <LimitWords
                            text={`${FRONTEND_URL}/link/${item.shortId}`}
                            wordLimit={20}
                          />
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.clicks}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        <ActiveStatus
                          isActive={item.isActive}
                          shortId={item.shortId}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-center items-center">
                        <QRModal urlId={item.shortId} cssClass="" title="" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <div className="flex justify-center items-center">
                          <button
                            onClick={() => handleOpenUrlModal(item)}
                            className="text-blue-500 hover:text-blue-700 mr-3 cursor-pointer"
                          >
                            More
                          </button>
                          <button
                            onClick={() => handleOpenActionModal(item)}
                            className="text-red-500 hover:text-red-700 mr-3 cursor-pointer"
                          >
                            Action
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        <DeleteModal urlId={item.urlId} />
                      </td>
                    </tr>
                  ))}
              </tbody>
              {url.length === 0 && (
                <tfoot>
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-zinc-600">
                      No URLs Found
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        )}
      </div>
      {/* Pagination Controls */}
      <Pagination
        totalPages={url.totalPages || 1}
        totalUrls={url.total || 0}
        limit={url.limit || 10}
        onPageChange={setPage}
        onLimitChange={setLimit}
        onFetch={() => fetchUrl()}
      />

      {isUrlModalOpen && selectedUrl && (
        <URLModal url={selectedUrl} onClose={handleCloseModal} />
      )}
      {isActionModalOpen && selectedUrl && (
        <ActionModal url={selectedUrl} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default URLs;
