<div className="flex-1 bg-slate-100/70 px-8 py-6 flex flex-col h-full">
  <div className="flex justify-between text-lg">
    <h1>{"< "}Chats</h1>
    <h1 className="text-xl font-bold underline text-orange-500 ">Today</h1>
    <h1>Next week {" >"}</h1>
  </div>
  <div className="flex-1 mt-16">
    <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
    <Item data={data} />
    <Item data={data} />
    <Item data={data} />
  </div>
</div>;
