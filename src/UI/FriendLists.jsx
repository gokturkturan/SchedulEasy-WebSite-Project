import Banner from "./Banner"
import EmptyFriendLists from "./EmptyFriendList"


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function FriendLists({friends,addHandler,participants,isLoading}) {

    const bgColors = ['bg-pink-600','bg-purple-600','bg-yellow-500','bg-green-500']
  
    return (
    <div>
       
      {!(isLoading) && friends.length != 0 &&<>
      <h2 className="mt-3 text-black-500 text-xs font-medium uppercase tracking-wide"><strong>You can add participants easily just by clicking on your friends !</strong></h2>
      <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {friends.map((friend,index) => (
        ( !(participants.includes(friend)) && <button onClick={()=> {addHandler(friend)}} type="button">
          <li key={index} className="col-span-1 flex shadow-sm rounded-md">
            <div
              className={classNames(
                bgColors[Math.floor(Math.random() * 4)],
                'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
              )}
            >
              {friend[0].toUpperCase()}
            </div>
            <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
              <div className="flex-1 px-4 py-2 text-sm truncate">
               {friend}
              </div>
              
            </div>
          </li>
          </button>)
        ))}
      </ul></>}
      {!(isLoading) && friends.length == 0 && <EmptyFriendLists/>}
      {isLoading && <Banner message={"We are gettin your friends..."}/>}
      
    </div>
  )
}


