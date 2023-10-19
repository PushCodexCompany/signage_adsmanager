const convertTimestampToFormattedDate = (timestamp) => {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear().toString().slice(-2); // Get the last 2 digits of the year

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

const logData = [
  {
    user: "Admin01",
    page: "Requests",
    time: 1658469600000,
    action: "Approve",
    action_on: "Booking",
    value: "#001",
  },
  {
    user: "Admin02",
    page: "Booking",
    time: 1658468700000,
    action: "Submit Request",
    action_on: "Content",
    value: "#002",
  },
  {
    user: "Sale01",
    page: "Content",
    time: 1658468700000,
    action: "Reject",
    action_on: "Content",
    value: "#003",
  },
  {
    user: "Supachai4",
    page: "Booking",
    time: 1658468700000,
    action: "Submit Request",
    action_on: "Content",
    value: "#004",
  },
  {
    user: "Nidarat_ssu",
    page: "Content",
    time: 1658468700000,
    action: "Reject",
    action_on: "Content",
    value: "#005",
  },
  {
    user: "Admin_sale",
    page: "Request",
    time: 1658468700000,
    action: "Approve",
    action_on: "Booking",
    value: "#006",
  },
  {
    user: "Admin05",
    page: "Content",
    time: 1658468700000,
    action: "Reject",
    action_on: "Booking",
    value: "#007",
  },
  {
    user: "Admin010",
    page: "Booking",
    time: 1658468700000,
    action: "Approve",
    action_on: "Content",
    value: "#008",
  },
  {
    user: "Admin12",
    page: "Requests",
    time: 1658468700000,
    action: "Submit Request",
    action_on: "Booking",
    value: "#009",
  },
];

export const GridTable = () => {
  return (
    <>
      <div className="w-auto h-[600px] overflow-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                User
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Page
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Action On
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {logData.map((row, index) => (
              <tr key={row.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md">{index + 1}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md ">{row.user}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md ">{row.page}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md">
                    {convertTimestampToFormattedDate(row.time)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md ">{row.action}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md ">{row.action_on}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md ">{row.value}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
