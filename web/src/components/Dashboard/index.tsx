import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import {Eye , EyeSlash} from 'phosphor-react'
import classNames from 'classnames'
import { useAuth } from '../../hooks/useAuth'
import { getFeedbackByUser } from './services'


interface FeedbackType {
    id: string;
    comment:string;
    type: 'IDEA' | 'BUG' | 'OTHER';
    screenshot?: string
    userId: string

}
interface FeedbackState {
    feedType : FeedbackType[]
}
export function Dashboard(){
    const { user } = useAuth()
    const [feedbacks, setFeedbacks] = useState<any>()
    const [photo , setPhoto] = useState<string | undefined>('')
    
    const handlePhotoSelect = (photo?: string) => {
        setPhoto('')

        setPhoto(photo)
    }
    useEffect(() => {
        if(user) {
            getFeedbackByUser(user.id).then(resp => {
                const data = {
                    BUG : resp.data.filter((item : FeedbackType) => item.type === 'BUG' && {...item} ),
                    IDEA : resp.data.filter((item : FeedbackType) => item.type === 'IDEA' && {...item} ),
                    OTHER : resp.data.filter((item : FeedbackType) => item.type === 'OTHER' && {...item} )
                }
                
                if(data)setFeedbacks(data)
                
            })
                
        
    }
    },[user?.id])
      return (
        <div className='flex justify-between p-6 '>
        <div className="w-full max-w-md px-2 py-16 sm:px-0">
          {feedbacks && (
            <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
              {Object.keys(feedbacks).map((feedbackType) => (
                <Tab
                  key={feedbackType}
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    )
                  }
                >
                  {feedbackType}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
            {Object.values(feedbacks).map((feedback : any, idx) => (
                <Tab.Panel
                key={idx}
                className={classNames(
                    'rounded-xl bg-white p-3',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                )}
                >
                    
                <ul>
                    {feedback.map((feedback : FeedbackType) => (
                    <li
                        key={feedback.id}
                        className="relative rounded-md p-3 hover:bg-gray-100 flex justify-between gap-6"
                    >
                        <h3 className={classNames("text-sm font-medium leading-5", {
                            'text-red-500': feedback.type === 'BUG',
                            'text-green-500': feedback.type === 'IDEA',
                            'text-blue-500': feedback.type === 'OTHER',
                        })}>
                        {feedback.type}
                        </h3>

                        <div className="mt-1 flex space-x-1 text-xs font-normal leading-5 text-gray-500 text-justify">
                        
                            <span>{feedback.comment}</span>
                            
                        </div>

                       
                        {feedback.screenshot ? (
                            <button onClick={() => handlePhotoSelect(feedback.screenshot)}>
                                <Eye/>
                            </button>
                        ): (
                            <button >
                                <EyeSlash onClick={() => setPhoto('')} />
                            </button>

                        )}
                    </li>
                    ))}
                </ul>
                </Tab.Panel>
            ))}
            </Tab.Panels>
          </Tab.Group>
          )}
          </div>
          {photo && (
            <div>
                <img src={photo} alt="photo" className='w-[50vw] h-[45vh] rounded-xl ' />
            </div>
          )}
        </div>
      )
}