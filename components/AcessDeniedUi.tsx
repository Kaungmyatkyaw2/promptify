import { KeyRound } from 'lucide-react'
import React from 'react'

const AcessDeniedUi = () => {
    return (
        <div className='flex-center flex-col  mt-20'>
            <KeyRound className='text-gray-400' size={100} />
            <div className='space-x-[10px]'>
                <p className='desc font-inter text-center'>You are not log in yet.</p>
                <h1 className='text-4xl font-bold font-inter text-center'><span className='orange_gradient'>Please Login First</span></h1>
            </div>
        </div>
    )
}

export default AcessDeniedUi