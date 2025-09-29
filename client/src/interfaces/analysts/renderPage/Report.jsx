import React from 'react'
import TestReport from '../datatable/TestReport'

function Report() {
  return (
      <div className='d-flex reg-analysis '>
          <div className=' analysis container-fluid mb-5'>      
            <TestReport/>
          </div>
      </div>
    )
}

export default Report