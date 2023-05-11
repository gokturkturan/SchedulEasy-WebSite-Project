import { XCircleIcon,CheckCircleIcon  } from '@heroicons/react/solid'

export default function Alert({title,messages,status}) {

  const color = status == "succ" ? `green` : `red`;
  const Icon = status === "succ" ? <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" /> :<XCircleIcon className="h-10 w-10 text-red-400" aria-hidden="true" />;
  return (
    <div className={`rounded-md bg-${color}-100 p-4`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {Icon}
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium text-${color}-800`}>{title}</h3>
          <div className={`mt-2 text-sm text-${color}-700`}>
            <ul role="list" className="list-disc pl-5 space-y-1">
              {messages.map((message,index) => <li key={`li${index}`}>{message}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}