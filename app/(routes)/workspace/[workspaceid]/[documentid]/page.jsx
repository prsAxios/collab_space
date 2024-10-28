import React from 'react'
import SideNav from '../../_components/SideNav'
import DocumentEditorSection from '../../_components/DocumentEditorSection'
import CommentBox from '../../_components/CommentBox'
import { Room } from '@/app/Room'

function Workspace({params}) {
  return (
      <Room params={params}>
      <div>
        {/*Side Navbar*/}
        <div>
            <SideNav params={params}/>
        </div>
         {/*Document side*/}
        <div className='md:ml-72'>
              {/* <Document/> */}
              <DocumentEditorSection params={params}/>
        </div>
      </div>
      </Room>
  )
}


export default Workspace