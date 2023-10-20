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
    media_name: "Mid year sale 2023.mp4",
    merchandise: "Nike",
    screen: "Screen 1",
    start_time: 1658901600000,
    end_time: 1658901600000,
    Duration: 15,
  },
  {
    media_name: "Promotion Summer.mp4",
    merchandise: "Adidas",
    screen: "Screen 2",
    start_time: 1658900700000,
    end_time: 1658900700000,
    Duration: 15,
  },
  {
    media_name: "Sample Ads.png",
    merchandise: "Adidas 3",
    screen: "Screen 2",
    start_time: 1658900700000,
    end_time: 1658900700000,
    Duration: 15,
  },
  {
    media_name: "Mid Night Sale 2023.mp4",
    merchandise: "FILA",
    screen: "Screen 3",
    start_time: 1658900700000,
    end_time: 1658900700000,
    Duration: 15,
  },
  {
    media_name: "Mid year sale 2023.mp4",
    merchandise: "FILA",
    screen: "Screen 4",
    start_time: 1658900700000,
    end_time: 1658900700000,
    Duration: 15,
  },
  {
    media_name: "Mid year sale 2023.mp4",
    merchandise: "BAOBAO",
    screen: "Screen 5",
    start_time: 1658900700000,
    end_time: 1658900700000,
    Duration: 15,
  },
  {
    media_name: "Food Hall Ads.png",
    merchandise: "After You",
    screen: "Screen 5",
    start_time: 1658900700000,
    end_time: 1658900700000,
    Duration: 15,
  },
  {
    media_name: "Mid year sale 2023.mp4",
    merchandise: "Adidas",
    screen: "Screen 7",
    start_time: 1658900700000,
    end_time: 1658900700000,
    Duration: 15,
  },
  {
    media_name: "Pet Show 2023.mp4",
    merchandise: "Tops",
    screen: "Screen 10",
    start_time: 1658900700000,
    end_time: 1658900700000,
    Duration: 15,
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
                Media Name
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Merchandise
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Screen
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Start Time
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                End Time
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Duration
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
                    {row.media_name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {row.merchandise}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {row.screen}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {convertTimestampToFormattedDate(row.start_time)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {convertTimestampToFormattedDate(row.end_time)}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {secondsToTime(row.Duration)}
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
