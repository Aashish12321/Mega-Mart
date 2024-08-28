import React, { useCallback, useEffect, useState } from "react";
import summaryApi from "../../Common/index";
import { toast } from "react-toastify";
import DashboardChart from "../../Components/DashboardChart";
import displayNepCurrency from "../../helpers/displayNepCurrency";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState({});

  const fetchDashboardData = useCallback(async () => {
    let response = await fetch(summaryApi.dashboard.url, {
      method: summaryApi.dashboard.method,
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
    });
    response = await response.json();
    if (response.success) {
      setData(response.data);
    } else {
      toast.error(response.message);
    }
  }, [token]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <div className="m-1 p-1 md:m-2 md:p-2 rounded-lg">
      <div className="px-2 py-1 mb-4 border-2 border-zinc-400 bg-stone-500 rounded-full">
        <span className="text-xl font-bold">Dashboard</span>
      </div>
      <div className="w-full px-2 py-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="relative bg-gradient-to-r from-purple-400 to-purple-600 p-6 rounded-lg shadow-lg hover:shadow-custom transition-all hover:scale-105 cursor-pointer">
            <div className="w-fit relative group">
              <h4 className="text-white text-lg font-semibold">
                Total Vendors
              </h4>
              <div className="absolute bottom-0 w-0 h-0.5 group-hover:w-full bg-white transition-all duration-200"></div>
            </div>
            <p className="text-3xl text-white">{data?.totalVendors}</p>
            <div className="absolute top-0 right-0 p-2 text-sm text-white opacity-75 hover:opacity-100 transition-opacity">
              <p className="text-right">
                {data?.changeInVendors}% from last month
              </p>
            </div>
          </div>

          <div className="relative bg-gradient-to-r from-purple-400 to-purple-600 h-36 p-6 rounded-lg shadow-lg hover:shadow-custom transition-all hover:scale-105 cursor-pointer">
            <div className="w-fit relative group">
              <h4 className="text-white text-lg font-semibold">
                Total Customers
              </h4>
              <div className="absolute bottom-0 w-0 h-0.5 group-hover:w-full bg-white transition-all duration-200"></div>
            </div>
            <p className="text-3xl text-white">{data?.totalCustomers}</p>
            <div className="absolute top-0 right-0 p-2 text-sm text-white opacity-75 hover:opacity-100 transition-opacity">
              <p className="text-right">
                {data?.changeInCustomers}% from last month
              </p>
            </div>
          </div>

          <div className="bg-yellow-100 h-36 p-6 rounded-lg shadow-lg hover:shadow-custom transition-all hover:scale-105 cursor-pointer">
            <div className="w-fit relative group">
              <h4 className="text-yellow-800 text-lg font-semibold">
                Pending Deliveries
              </h4>
              <div className="absolute bottom-0 w-0 h-0.5 group-hover:w-full bg-yellow-500 transition-all duration-200"></div>
            </div>
            <p className="text-3xl text-yellow-600">{data?.newOrders}</p>
            <i className="fas fa-truck text-yellow-600 text-4xl"></i>
          </div>

          <div className="bg-green-100 h-36 p-6 rounded-lg shadow-lg hover:shadow-custom transition-all hover:scale-105 cursor-pointer">
            <div className="w-fit relative group">
              <h4 className="text-green-800 text-lg font-semibold">
                Completed Deliveries
              </h4>
              <div className="absolute bottom-0 w-0 h-0.5 group-hover:w-full bg-green-500 transition-all duration-200"></div>
            </div>
            <p className="text-3xl text-green-600">{data?.deliveredOrders}</p>
          </div>

          <div className="bg-pink-100 h-36 p-6 rounded-lg shadow-lg hover:shadow-custom transition-all hover:scale-105 cursor-pointer">
            <div className="w-fit relative group">
              <h4 className="text-pink-800 text-lg font-semibold">
                Open Average Order
              </h4>
              <div className="absolute bottom-0 w-0 h-0.5 group-hover:w-full bg-pink-500 transition-all duration-200"></div>
            </div>
            <p className="text-3xl text-pink-600">
              {displayNepCurrency(data?.openAvgOrderValue)}
            </p>
          </div>

          <div className="bg-teal-100 h-36 p-6 rounded-lg shadow-lg hover:shadow-custom transition-all hover:scale-105 cursor-pointer">
            <div className="w-fit relative group">
              <h4 className="text-teal-800 text-lg font-semibold">
                Average Purchase Order
              </h4>
              <div className="absolute bottom-0 w-0 h-0.5 group-hover:w-full bg-teal-500 transition-all duration-200"></div>
            </div>
            <p className="text-3xl text-teal-600">
              {displayNepCurrency(data?.avgPurchaseOrder)}
            </p>
          </div>

          <div className="bg-indigo-100 h-36 p-6 rounded-lg shadow-lg hover:shadow-custom transition-all hover:scale-105 cursor-pointer">
            <div className="w-fit relative group">
              <h4 className="text-indigo-800 text-lg font-semibold">
                Lifetime Sales
              </h4>
              <div className="absolute bottom-0 w-0 h-0.5 group-hover:w-full bg-indigo-500 transition-all duration-200"></div>
            </div>
            <p className="text-3xl text-indigo-600">
              {displayNepCurrency(data?.lifetimeSales)}
            </p>
          </div>
        </div>

        <div className="w-full max-w-2xl mt-6 p-6 text-yellow-800  bg-yellow-100 rounded-lg shadow-lg hover:shadow-custom transition-all hover:scale-105 cursor-pointer">
          <div className="flex flex-col justify-between">
            <h4 className="text-lg font-semibold">Monthly Sales</h4>
            <div className="mt-4">
              <DashboardChart salesData={data?.monthlySales} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
