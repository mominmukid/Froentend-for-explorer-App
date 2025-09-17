import React from 'react'


function Videopalyer() {

   return (
      <div className='w-full h-full flex justify-center items-start'>
         <div className='w-[90%] h-[60%]'>
            <video src="public\Videos\5121889_Person_People_3840x2160.mp4" controls={true} className='w-[100%] h-[25%]'></video>
         </div>
      </div>
   )
}

export default Videopalyer