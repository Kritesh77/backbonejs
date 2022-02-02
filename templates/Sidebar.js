<div className="w-1/4 bg-white px-4 py-8 flex flex-col drop-shadow-lg ">
    <div className="">
      <h1 className="text-4xl font-bold">Orgzit</h1>
      <div className="mt-12">
        <h1 className="font-light text-sm text-gray-500">Welcome,</h1>
        <h1 className="text-lg font-bold ">Kritesh Kaushik</h1>
      </div>
    </div>
    <div className="flex-1 mt-12">
      <div className="rounded-xl bg-orange-100 px-4 py-3 flex justify-between  hover:shadow-lg">
        <img src="/Tasks.png" width="24px" />
        <Link href="/">
          <h1 className="font-bold text-orange-600 flex-1 ml-3 cursor-pointer">
            Tasks
          </h1>
        </Link>

        <img src="/Plus.png" width="24px" className="cursor-pointer" />
      </div>
      <div className="rounded-xl bg-gray-100 px-4 py-3 flex justify-between mt-4 hover:shadow-lg">
        <img src="/Chat Room.png" width="24px" />
        <Link href="/chatroom/chats">
          <h1 className="font-bold text-gray-600 flex-1 ml-3 cursor-pointer">
         
            Chats
          </h1>
        </Link>
      </div>
      <div className="rounded-xl bg-gray-100 px-4 py-3 flex justify-between mt-4 hover:shadow-lg">
        <img src="/Friend.png" width="24px" />
        <Link href="/friends">
          <h1 className="font-bold text-gray-600 flex-1 ml-3 cursor-pointer">
            Friends
          </h1>
        </Link>
        <img src="/PlusGray.png" width="24px" className="cursor-pointer" />
      </div>
    </div>
    <div>
      <div className="bg-red-300 px-4 py-3 rounded-xl flex hover:bg-red-500 cursor-pointer">
        <img src="/Add New.png" width="24px" />
        <h1 className="text-white font-bold ml-3">Assign a task</h1>
      </div>
    </div>
  </div>