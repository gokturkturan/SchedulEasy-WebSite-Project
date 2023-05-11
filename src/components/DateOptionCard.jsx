import { CalendarIcon, ClockIcon } from "@heroicons/react/outline";
import { ClockIcon as ClockIconSolid } from "@heroicons/react/solid";

export default function DateOptionCard(props) {
  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {props.options.map((option,index) => (
        <li key={index} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
          <div className="w-full flex items-center justify-between p-6 space-x-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-1">
              <CalendarIcon height={15} width={15}/>
                <h3 className="text-gray-900 text-sm font-medium truncate">
                
                  Date: {option.date}
                </h3>
                {/* <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                  {person.role}
                </span> */}
              </div>
              <div className="flex items-center space-x-1">
              <ClockIcon height={15} width={15}/>
              <p className="mt-1 text-gray-500 text-sm md:text-clip flex-1">{`Start Time: ${option.startTime}`}</p>
              </div>
              <div className="flex items-center space-x-1">
                <ClockIconSolid height={15} width={15}/>
              <p className="mt-1 text-gray-500 text-sm md:text-clip flex-1">{`End Time: ${option.endTime}`}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="w-0 flex-1 flex">
                {/* <a
                  href={`mailto:${person.email}`}
                  className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                >
                  <MailIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">Email</span>
                </a> */}
              </div>
              <div className="-ml-px w-0 flex-1 flex">
                {/* <a
                  href={`tel:${person.telephone}`}
                  className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                >
                  <PhoneIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">Call</span>
                </a> */}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}