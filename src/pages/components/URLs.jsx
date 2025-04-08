import React, { useEffect, useState } from "react";
import { StoreState } from "../../context/Store";
import QRModal from "../../components/QRModal";
import URLModal from "../../components/URLModal";
import ActionModal from "../../components/ActionModal";
import { FRONTEND_URL } from "../../utilis/constants";

const URLs = () => {
  const { url, fetchUrl } = StoreState();
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);

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
    fetchUrl();
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  // Separate function for URL modal
  const handleOpenUrlModal = (urlData) => {
    setSelectedUrl(urlData);
    setIsUrlModalOpen(true);
  };

  // Separate function for Action modal
  const handleOpenActionModal = (urlData) => {
    setSelectedUrl(urlData);
    setIsActionModalOpen(true);
  };

  // Close all modals
  const handleCloseModal = () => {
    setIsUrlModalOpen(false);
    setIsActionModalOpen(false);
    setSelectedUrl(null);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        URL Management
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search URLs..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={refreshUrls}
            className="py-2 px-2 bg-blue-600 text-white rounded-lg "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#FFFFFF"
            >
              <path d="M482-160q-134 0-228-93t-94-227v-7l-64 64-56-56 160-160 160 160-56 56-64-64v7q0 100 70.5 170T482-240q26 0 51-6t49-18l60 60q-38 22-78 33t-82 11Zm278-161L600-481l56-56 64 64v-7q0-100-70.5-170T478-720q-26 0-51 6t-49 18l-60-60q38-22 78-33t82-11q134 0 228 93t94 227v7l64-64 56 56-160 160Z" />
            </svg>
          </button>
        </div>
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {url &&
                url.map((item) => (
                  <tr key={item.urlId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <LimitWords text={item.redirectURL} wordLimit={25} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                      <a
                        href={`${FRONTEND_URL}/redirect/${item.shortId}`}
                        className="text-blue-500 hover:underline"
                        target="_blank"
                      >
                        <LimitWords
                          text={`${FRONTEND_URL}/redirect/${item.shortId}`}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.isActive ? "Active" : "Inactive"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-center items-center">
                      <QRModal
                        urlId={item.shortId}
                        cssClass="invert-[100%]"
                        title=""
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center ">
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
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* URL Modal */}
      {isUrlModalOpen && selectedUrl && (
        <URLModal url={selectedUrl} onClose={handleCloseModal} />
      )}

      {/* Action Modal */}
      {isActionModalOpen && selectedUrl && (
        <ActionModal url={selectedUrl} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default URLs;
