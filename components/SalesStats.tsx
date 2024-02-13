import { FaDollarSign, FaFile } from "react-icons/fa";

interface Props {
  data: { numberOfBookings: string; totalSales: string };
}

const SalesStats = ({ data }: Props) => {
  return (
    <div className="row my-5">
      <div className="col-12 col-lg-6">
        <div className="card shadow ps-5">
          <div className="card-body">
            <div className="row justify-content-between">
              <div className="col-2">
                <FaDollarSign size={56} style={{ color: "#dbdee4" }} />
              </div>
              <div className="col-9">
                <p className="card-title">Sales</p>
                <p className="h4">
                  <b>{data?.totalSales || 0}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-6 mt-4 mt-lg-0">
        <div className="card shadow ps-5">
          <div className="card-body">
            <div className="row justify-content-between">
              <div className="col-2">
                <FaFile size={56} style={{ color: "#dbdee4" }} />
              </div>
              <div className="col-9">
                <p className="card-title">Bookings</p>
                <p className="h4">
                  <b>{data?.numberOfBookings || 0}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesStats;
