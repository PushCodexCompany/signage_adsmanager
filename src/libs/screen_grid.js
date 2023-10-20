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

const secondsToTime = (value) => {
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value % 3600) / 60);
  const seconds = value % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

const logData = [
  {
    screen_name: "Screen 1",
    event: "Event 1",
    time: 1658901600000,
    status: "Up",
  },
  {
    screen_name: "Screen 2",
    event: "Event 2",
    time: 1658900700000,
    status: "Up",
  },
  {
    screen_name: "Screen 3",
    event: "Event 3",
    time: 1658900700000,
    status: "Down",
  },
  {
    screen_name: "Screen 4",
    event: "Event 4",
    time: 1658900700000,
    status: "Down",
  },
  {
    screen_name: "Screen 5",
    event: "Event 5",
    time: 1658900700000,
    status: "Up",
  },
  {
    screen_name: "Screen 6",
    event: "Event 6",
    time: 1658900700000,
    status: "Down",
  },
  {
    screen_name: "Screen 7",
    event: "Event 7",
    time: 1658900700000,
    status: "Down",
  },
  {
    screen_name: "Screen 8",
    event: "Event 8",
    time: 1658900700000,
    status: "Up",
  },
  {
    screen_name: "Screen 9",
    event: "Event 9",
    time: 1658900700000,
    status: "Up",
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
                Screen Name
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Event
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {logData.map((row, index) => (
              <tr key={row.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {index + 1}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {row.screen_name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {row.event}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {convertTimestampToFormattedDate(row.time)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {row.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
