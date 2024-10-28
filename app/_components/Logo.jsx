import React from 'react'
import Image from 'next/image'

function Logo(){
    return(
        <div className='flex items-center'>
            <Image src={'/logo2.png'} alt='CloudCase Logo'
            width={170} height={170}
            />
        </div>
    )
}

export  default Logo