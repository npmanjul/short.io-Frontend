import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import DoughnutChart from "../../components/DoughnutChart";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import Loader from "../../components/Loader";
import useStore from "../../store";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  const {
    visitData,
    deviceInfo,
    deviceBattery,
    deviceNetwork,
    deviceLocation,
    fetchVisitData,
    fetchDeviceInfo,
    fetchDeviceBattery,
    fetchDeviceNetwork,
    fetchDeviceLocation,
  } = useStore();

  const [isLoading, setIsLoading] = useState(true);

  const generateRandomColors = (size) => {
    return Array.from(
      { length: size },
      () =>
        `#${Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")}`
    );
  };

  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([
        fetchVisitData(),
        fetchDeviceInfo(),
        fetchDeviceBattery(),
        fetchDeviceNetwork(),
        fetchDeviceLocation(),
      ]);
      setIsLoading(false);
    };

    fetchAllData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <Loader
            height={"h-10"}
            width={"w-10"}
            color={"text-white"}
            bgColor={"fill-black"}
          />
        </div>
      ) : (
        <div className="bg-white  rounded-lg shadow sm:p-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Analytics Dashboard
          </h2>

          <div className="flex justify-center items-center flex-col gap-5 w-full">
            {/* Total Visits Chart */}
            <div className=" rounded-lg py-2 w-full bg-gray-50">
              <h3 className="text-[20px] font-bold text-gray-600 px-4 py-2 flex justify-center items-center">
                Total Visits
              </h3>
              <div className="w-full rounded-lg p-4 overflow-x-auto">
                <LineChart
                  labelsArray={visitData.datesArray}
                  dataArray={visitData.countsArray}
                  labelName={"URL Clicks"}
                  title={"Click Trends Over Time"}
                  tooltipName={"Clicks"}
                />
              </div>
            </div>

            {/* Device Location Chart */}
            <div className="flex justify-center items-center flex-wrap w-full gap-5 bg-gray-50 p-5 rounded-lg">
              <h3 className="text-[20px] font-bold text-gray-600 px-4 py-2">
                Device Locations
              </h3>
              <div className="flex justify-center items-center w-full gap-5 md:flex-row flex-col">
                {/* Device Distribution Chart */}
                <div className="bg-white rounded-lg p-4 w-full">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    City
                  </h3>
                  <div className="h-[300px] flex justify-center items-center">
                    <PieChart
                      dataArray={deviceLocation?.city?.values || []} // Prevents undefined error
                      labelsArray={deviceLocation?.city?.keys || []}
                      bgColorArray={generateRandomColors(
                        deviceLocation?.city?.keys?.length || 0
                      )}
                    />
                  </div>
                </div>

                {/* Device Distribution Chart */}
                <div className="bg-white rounded-lg p-4 w-full">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    State
                  </h3>
                  <div className="h-[300px] flex justify-center items-center">
                    <PieChart
                      dataArray={deviceLocation?.region?.values || []} // Prevents undefined error
                      labelsArray={deviceLocation?.region?.keys || []}
                      bgColorArray={generateRandomColors(
                        deviceLocation?.region?.keys?.length || 0
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center w-full gap-5">
                {/* Device Distribution Chart */}
                <div className="bg-white rounded-lg p-4 w-full">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    Country
                  </h3>
                  <div className="h-[300px] flex justify-center items-center w-full">
                    <BarChart
                      labelsArray={deviceLocation?.country?.keys || []}
                      dataArray={deviceLocation?.country?.values || []}
                      chartTitle={"Users"}
                      bgColorArray={generateRandomColors(
                        deviceLocation?.country?.keys?.length || 0
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Device Info Chart */}
            <div className="flex justify-center items-center flex-wrap w-full gap-5 bg-gray-50 p-5 rounded-lg">
              <h3 className="text-[20px] font-bold text-gray-600 px-4 py-2">
                Device Informations
              </h3>
              <div className="flex justify-center items-center w-full gap-5 md:flex-row flex-col">
                {/* Device type Chart */}
                <div className="bg-white rounded-lg p-4 w-full">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    Device Type
                  </h3>
                  <div className="h-[300px] flex justify-center items-center">
                    <DoughnutChart
                      dataArray={deviceInfo?.deviceType?.values || []} // Prevents undefined error
                      labelsArray={deviceInfo?.deviceType?.keys || []}
                      bgColorArray={generateRandomColors(
                        deviceInfo?.deviceType?.keys?.length || 0
                      )}
                    />
                  </div>
                </div>

                {/* Device Language Chart */}
                <div className="bg-white rounded-lg p-4 w-full">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    Language
                  </h3>
                  <div className="h-[300px] flex justify-center items-center">
                    <DoughnutChart
                      dataArray={deviceInfo?.language?.values || []} // Prevents undefined error
                      labelsArray={deviceInfo?.language?.keys || []}
                      bgColorArray={generateRandomColors(
                        deviceInfo?.language?.keys?.length || 0
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center w-full gap-5 md:flex-row flex-col">
                {/* vender Chart */}
                <div className="bg-white rounded-lg p-4 w-full">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    Vendor
                  </h3>
                  <div className="h-[300px] flex justify-center items-center">
                    <DoughnutChart
                      dataArray={deviceInfo?.vendor?.values || []} // Prevents undefined error
                      labelsArray={deviceInfo?.vendor?.keys || []}
                      bgColorArray={generateRandomColors(
                        deviceInfo?.vendor?.keys?.length || 0
                      )}
                    />
                  </div>
                </div>

                {/* Plateform Chart */}
                <div className="bg-white rounded-lg p-4 w-full">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    Plateform
                  </h3>
                  <div className="h-[300px] flex justify-center items-center">
                    <DoughnutChart
                      dataArray={deviceInfo?.platform?.values || []} // Prevents undefined error
                      labelsArray={deviceInfo?.platform?.keys || []}
                      bgColorArray={generateRandomColors(
                        deviceInfo?.platform?.keys?.length || 0
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className=" rounded-lg py-2 w-full bg-white">
                <h3 className="text-sm font-medium text-gray-600 px-4 py-2">
                  Device Cores
                </h3>
                <div className=" h-[300px] w-full rounded-lg p-4 overflow-x-auto flex justify-center items-center">
                  <BarChart
                    labelsArray={deviceInfo?.deviceCores?.keys || []}
                    dataArray={deviceInfo?.deviceCores?.values || []}
                    chartTitle={"Users"}
                    bgColorArray={generateRandomColors(
                      deviceInfo?.deviceCores?.keys?.length || 0
                    )}
                  />
                </div>
              </div>

              <div className=" rounded-lg py-2 w-full bg-white">
                <h3 className="text-sm font-medium text-gray-600 px-4 py-2">
                  Device RAM
                </h3>
                <div className="h-[300px] w-full rounded-lg p-4 overflow-x-auto flex justify-center items-center">
                  <BarChart
                    labelsArray={deviceInfo?.deviceRAM?.keys || []}
                    dataArray={deviceInfo?.deviceRAM?.values || []}
                    chartTitle={"Users"}
                    bgColorArray={generateRandomColors(
                      deviceInfo?.deviceRAM?.keys?.length || 0
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center flex-wrap w-full gap-5 bg-gray-50 p-5 rounded-lg">
              <h3 className="text-[20px] font-bold text-gray-600 px-4 py-2">
                Network Infomation
              </h3>

              <div className="flex justify-center items-center w-full gap-5 md:flex-row flex-col">
                {/* Device type Chart */}

                {/* Device Connection Type Chart */}
                <div className="bg-white rounded-lg p-4 w-full">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    Connection Type
                  </h3>
                  <div className="h-[300px] flex justify-center items-center">
                    <DoughnutChart
                      dataArray={deviceInfo?.connectionType?.values || []} // Prevents undefined error
                      labelsArray={deviceInfo?.connectionType?.keys || []}
                      bgColorArray={generateRandomColors(
                        deviceInfo?.connectionType?.keys?.length || 0
                      )}
                    />
                  </div>
                </div>

                {/* Device Connection status Chart */}
                <div className="bg-white rounded-lg p-4 w-full">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    Device Status
                  </h3>
                  <div className="h-[300px] flex justify-center items-center">
                    <DoughnutChart
                      dataArray={deviceInfo?.onlineStatus?.values || []} // Prevents undefined error
                      labelsArray={deviceInfo?.onlineStatus?.keys || []}
                      bgColorArray={generateRandomColors(
                        deviceInfo?.onlineStatus?.keys?.length || 0
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center w-full gap-5 md:flex-row flex-col">
                {/* Device Distribution Chart */}
                <div className="bg-white rounded-lg p-4 w-full">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    ISP
                  </h3>
                  <div className="h-[300px] flex justify-center items-center">
                    <DoughnutChart
                      dataArray={deviceNetwork?.isp?.values || []} // Prevents undefined error
                      labelsArray={deviceNetwork?.isp?.keys || []}
                      bgColorArray={generateRandomColors(
                        deviceNetwork?.isp?.keys?.length || 0
                      )}
                    />
                  </div>
                </div>

                {/* Device Distribution Chart */}
                <div className="bg-white rounded-lg p-4 w-full">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    Org
                  </h3>
                  <div className="h-[300px] flex justify-center items-center">
                    <DoughnutChart
                      dataArray={deviceNetwork?.org?.values || []}
                      labelsArray={deviceNetwork?.org?.keys || []}
                      bgColorArray={generateRandomColors(
                        deviceNetwork?.org?.keys?.length || 0
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center w-full gap-5 md:flex-row flex-col">
                {/* Device Distribution Chart */}
                <div className="bg-white rounded-lg p-4 w-full">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    Proxy
                  </h3>
                  <div className="h-[300px] flex justify-center items-center">
                    <DoughnutChart
                      dataArray={deviceNetwork?.proxy?.values || []}
                      labelsArray={deviceNetwork?.proxy?.keys || []}
                      bgColorArray={generateRandomColors(
                        deviceNetwork?.proxy?.keys?.length || 0
                      )}
                    />
                  </div>
                </div>

                {/* Device Distribution Chart */}
                <div className="bg-white rounded-lg p-4 w-full">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    Hosting
                  </h3>
                  <div className="h-[300px] flex justify-center items-center">
                    <DoughnutChart
                      dataArray={deviceNetwork?.hosting?.values || []} // Prevents undefined error
                      labelsArray={deviceNetwork?.hosting?.keys || []}
                      bgColorArray={generateRandomColors(
                        deviceNetwork?.hosting?.keys?.length || 0
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center flex-wrap w-full gap-5 bg-gray-50 p-5 rounded-lg">
              <h3 className="text-[20px] font-bold text-gray-600 px-4 py-2">
                Battery Infomation
              </h3>
              <div className=" rounded-lg py-2 w-full bg-white">
                <div className="w-full rounded-lg p-4 overflow-x-auto">
                  <LineChart
                    labelsArray={deviceBattery.batteryArray}
                    dataArray={deviceBattery.countsArray}
                    labelName={"Battery Level"}
                    title={"Battery Level"}
                    tooltipName={"Visiter"}
                  />
                </div>
              </div>

              <div className=" rounded-lg py-2 w-full bg-white">
                <div className="w-full rounded-lg p-4 overflow-x-auto">
                  <LineChart
                    labelsArray={deviceBattery.dischargingTimeKeys}
                    dataArray={deviceBattery.dischargingTimeValues}
                    labelName={"Discharging Time"}
                    title={"Discharging Time"}
                    tooltipName={"Visiter"}
                  />
                </div>
              </div>

              <div className="flex justify-center items-center w-full gap-5">
                {/* Device Distribution Chart */}
                <div className="bg-white rounded-lg p-4 w-full">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    Charging Status
                  </h3>
                  <div className="h-[300px] flex justify-center items-center">
                    <BarChart
                      dataArray={deviceBattery.chargingStatusValues}
                      labelsArray={deviceBattery.chargingStatusKeys}
                      chartTitle={"Users"}
                      bgColorArray={generateRandomColors(
                        deviceBattery.chargingStatusKeys?.length || 0
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Analytics;
