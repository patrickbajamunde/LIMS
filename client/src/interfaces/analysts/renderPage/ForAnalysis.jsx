import React from 'react'
import DataAnalysis from '../datatable/DataAnalysis';
import './styles/general.css'


function ForAnalysis() {
  return (
    <div className='d-flex reg-analysis '>
        <div className=' analysis container-fluid mb-5'>      
        <DataAnalysis/>
        </div>
    </div>
  )
}

export default ForAnalysis;