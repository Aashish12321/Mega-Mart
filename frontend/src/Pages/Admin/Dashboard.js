import React, { useCallback, useEffect, useState } from "react";
import summaryApi from "../../Common/index";
import { toast } from "react-toastify";
import DashboardChart from "../../Components/DashboardChart";
import displayNepCurrency from "../../helpers/displayNepCurrency";
import { useSelector } from "react-redux";
import { selectUser } from "../../Store/selector";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState({});
  const user = useSelector(selectUser);

  const fetchDashboardData = useCallback(async () => {
    let response = {};
    if (user?.role === "ADMIN") {
      response = await fetch(summaryApi.admin_dashboard.url, {
        method: summaryApi.admin_dashboard.method,
        headers: {
          "content-type": "application/json",
          authorization: `${token}`,
        },
      });
    } else {
      response = await fetch(summaryApi.vendor_dashboard.url, {
        method: summaryApi.vendor_dashboard.method,
        headers: {
          "content-type": "application/json",
          authorization: `${token}`,
        },
      });
    }
    response = await response.json();
    if (response.success) {
      setData(response.data);
    } else {
      toast.error(response.message);
    }
  }, [token, user]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <div className="m-1 p-1 md:m-2 md:p-2 rounded-lg">
      <div className="px-2 py-1 mb-4 border-2 border-zinc-400 bg-stone-500 rounded-full">
        <span className="text-xl font-bold">
        {user?.role==="ADMIN" ? "Admin Dashboard" : "Vendor Dashboard"}
        </span>
      </div>
      <div className="w-full px-2 py-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="relative group bg-gradient-to-r from-lime-100 to-lime-400 h-36 p-6 rounded-lg shadow-lg hover:shadow-custom transition-all hover:scale-105 cursor-pointer">
            <div className="w-fit relative">
              <h4 className="text-lime-800 bg- text-lg font-semibold">
                Total Customers
              </h4>
              <div className="absolute bottom-0 w-0 h-0.5 group-hover:w-full bg-lime-600 transition-all duration-200"></div>
            </div>
            <p className="text-3xl text-lime-600">{data?.totalCustomers || 0}</p>
            <div className="absolute top-0 right-0 p-2 text-sm text-lime-800">
              <p className="text-right">
                +{data?.changeInCustomers || 0}% from last month
              </p>
            </div>
          </div>

          {user?.role === "ADMIN" && (
            <div className="relative group bg-gradient-to-r from-purple-200 to-purple-400 p-6 rounded-lg shadow-lg hover:shadow-custom transition-all hover:scale-105 cursor-pointer">
              <div className="w-fit relative">
                <h4 className="text-purple-800 text-lg font-semibold">
                  Total Vendors
                </h4>
                <div className="absolute bottom-0 w-0 h-0.5 group-hover:w-full bg-purple-600 transition-all duration-200"></div>
              </div>
              <p className="text-3xl text-purple-600">{data?.totalVendors || 0}</p>
              <div className="absolute top-0 right-0 p-2 text-sm text-purple-800">
                <p className="text-right">
                  +{data?.changeInVendors || 0}% from last month
                </p>
              </div>
            </div>
          )}

          <div className="group bg-gradient-to-r from-yellow-100 to-yellow-400 h-36 p-6 rounded-lg shadow-lg hover:shadow-custom transition-all hover:scale-105 cursor-pointer">
            <div className="w-fit relative">
              <h4 className="text-yellow-800 text-lg font-semibold">
                Pending Deliveries
              </h4>
              <div className="absolute bottom-0 w-0 h-0.5 group-hover:w-full bg-yellow-600 transition-all duration-200"></div>
            </div>
            <p className="text-3xl text-yellow-600">{data?.newOrders}</p>
          </div>

          <div className="group bg-gradient-to-r from-green-100 to-green-400 h-36 p-6 rounded-lg shadow-lg hover:shadow-custom transition-all hover:scale-105 cursor-pointer">
            <div className="w-fit relative">
              <h4 className="text-green-800 text-lg font-semibold">
                Completed Deliveries
              </h4>
              <div className="absolute bottom-0 w-0 h-0.5 group-hover:w-full bg-green-600 transition-all duration-200"></div>
            </div>
            <p className="text-3xl text-green-600">{data?.deliveredOrders}</p>
          </div>

          <div className="group bg-gradient-to-r from-pink-100 to-pink-400 h-36 p-6 rounded-lg shadow-lg hover:shadow-custom transition-all hover:scale-105 cursor-pointer">
            <div className="w-fit relative">
              <h4 className="text-pink-800 text-lg font-semibold">
                Open Average Order
              </h4>
              <div className="absolute bottom-0 w-0 h-0.5 group-hover:w-full bg-pink-600 transition-all duration-200"></div>
            </div>
            <p className="text-3xl text-pink-600">
              {displayNepCurrency(parseInt(data?.openAvgOrderValue || 0))}
            </p>
          </div>

          <div className="group bg-gradient-to-r from-teal-100 to-teal-400 h-36 p-6 rounded-lg shadow-lg hover:shadow-custom transition-all hover:scale-105 cursor-pointer">
            <div className="w-fit relative">
              <h4 className="text-teal-800 text-lg font-semibold">
                Average Purchase Order
              </h4>
              <div className="absolute bottom-0 w-0 h-0.5 group-hover:w-full bg-teal-600 transition-all duration-200"></div>
            </div>
            <p className="text-3xl text-teal-600">
              {displayNepCurrency(parseInt(data?.avgPurchaseOrder || 0))}
            </p>
          </div>

          <div className="group bg-gradient-to-r from-indigo-100 to-indigo-400 h-36 p-6 rounded-lg shadow-lg hover:shadow-custom transition-all hover:scale-105 cursor-pointer">
            <div className="w-fit relative">
              <h4 className="text-indigo-800 text-lg font-semibold">
                Lifetime Sales
              </h4>
              <div className="absolute bottom-0 w-0 h-0.5 group-hover:w-full bg-indigo-600 transition-all duration-200"></div>
            </div>
            <p className="text-3xl text-indigo-600">
              {displayNepCurrency(parseInt(data?.lifetimeSales))}
            </p>
          </div>
        </div>

        <div className="w-full max-w-2xl mt-6 p-6 text-yellow-800  bg-yellow-100 rounded-lg shadow-lg hover:shadow-custom cursor-pointer">
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
