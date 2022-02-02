const Item = ({ data }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center text-xs text-gray-600">
      <h1>{data.dueDate}</h1>
      <div className="flex items-center">
        <h1>Assigned by </h1>
        <img src="/Ellipse 2.png" alt="user" width={"24px"} className="ml-2" />
      </div>
    </div>
    <div className="flex rounded-lg bg-white overflow-hidden mt-1">
      <div className="priority-red"></div>
      <div className="flex-1 px-2 self-center">
        <div className="flex items-baseline">
          <input type="checkbox" name="" id="" />
          <h1 className=" ml-2">{data.title}</h1>
        </div>
        <div className="flex">
          <div className="flex text-red-500">
            <div className="self-center mr-1">
              <img src="/Tags.png" alt="" />
            </div>
            {data.tags?.map((x, i) => (
              <h1 key={i}>{x}</h1>
            ))}
          </div>
          <div className="flex text-gray-400 ml-4">
            <div className="self-center mr-1">
              <img src="/Link.png" alt="" />
            </div>
            {data.links?.map((x, i) => (
              <a href="www.orgzit.com" key={i}>
                www.orgzit.com
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className=" px-4 py-6 opacity-50 cursor-pointer">
        <Link href="/chatroom/1">
          <img src="/Chat Room.png" alt="" />
        </Link>
      </div>
    </div>
  </div>
);
