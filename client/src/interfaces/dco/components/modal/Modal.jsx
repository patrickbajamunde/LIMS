import React from 'react';

export const RoaModal = ({ show, onClose, reportDetails, onChange, onSubmit, checkboxHandler, availableParameters, selectedParameters }) => {

  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form onSubmit={onSubmit}>
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Add Report Details</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Laboratory Code</label>
                <input
                  type="text"
                  className="form-control border border-dark"
                  name="labCode"
                  value={reportDetails.labCode}
                  onChange={(e) => onChange('labCode', e.target.value)}

                />
              </div>

              <div className="mb-3">
                <label className="form-label">Sample Code</label>
                <input
                  type="text"
                  className="form-control border border-dark"
                  name="sampleCode"
                  value={reportDetails.sampleCode}
                  onChange={(e) => onChange('sampleCode', e.target.value)}

                />
              </div>

              <div className="mb-3">
                <label className="form-label">Sample Description</label>
                <input
                  type="text"
                  className="form-control border border-dark"
                  name="sampleDescription"
                  value={reportDetails.sampleDescription}
                  onChange={(e) => onChange('sampleDescription', e.target.value)}

                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Test Parameters</label>
                <div className="row g-1">
                  {availableParameters.map((parameter, index) => (
                    <div className="form-check col-4 mb-2 " key={index}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`parameter-${index}`}
                        value={parameter}
                        checked={selectedParameters.includes(parameter)}
                        onChange={checkboxHandler}
                        style={{
                          width: '1.15rem',
                          height: '1.15rem',
                          WebkitAppearance: 'checkbox',
                          MozAppearance: 'checkbox',
                          appearance: 'auto',
                          accentColor: '#0d6efd'
                        }}  
                      />
                      <label className="form-check-label" htmlFor={`parameter-${index}`}>
                        {parameter}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Parameter</label>
                <input
                  type="text"
                  className="form-control border border-dark"
                  name="sampleParam"
                  value={reportDetails.sampleParam}
                  onChange={(e) => onChange('sampleParam', e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Result</label>
                <input
                  type="text"
                  className="form-control border border-dark"
                  name="result"
                  value={reportDetails.result}
                  onChange={(e) => onChange('result', e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Test Method</label>
                <textarea
                  type="text"
                  className="form-control border border-dark text-start"
                  name="testMethod"
                  value={reportDetails.testMethod}
                  onChange={(e) => onChange('testMethod', e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )

}

export const ArfAttachment = ({ show, onClose, ArfAttachment, onChange, onSubmit, checkboxHandler, availableParameters, selectedParameters }) => {

  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form onSubmit={onSubmit}>
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Add Sample Details</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className='form-label'>Lab Code</label>
                <input
                  type="text"
                  className='form-control border border-dark'
                  name='labCode'
                  value={ArfAttachment.labCode}
                  onChange={(e) => onChange('labCode', e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className='form-label'>Sample Code</label>
                <input
                  type="text"
                  className='form-control border border-dark'
                  name='sampleCode'
                  value={ArfAttachment.sampleCode}
                  onChange={(e) => onChange('sampleCode', e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className='form-label'>Sample Description</label>
                <input
                  type="text"
                  className='form-control border border-dark'
                  name='sampleDescription'
                  value={ArfAttachment.sampleDescription}
                  onChange={(e) => onChange('sampleDescription', e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Test Parameters</label>
                <div className="row g-1">
                  {availableParameters.map((parameter, index) => (
                    <div className="form-check col-4 mb-2 " key={index}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`parameter-${index}`}
                        value={parameter}
                        checked={selectedParameters.includes(parameter)}
                        onChange={checkboxHandler}
                        style={{
                          width: '1.15rem',
                          height: '1.15rem',
                          WebkitAppearance: 'checkbox',
                          MozAppearance: 'checkbox',
                          appearance: 'auto',
                          accentColor: '#0d6efd'
                        }}
                      />
                      <label className="form-check-label" htmlFor={`parameter-${index}`}>
                        {parameter}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label className='form-label'>Test Parameter Requested</label>
                <input
                  type="text"
                  className='form-control border border-dark'
                  name='parameterReq'
                  value={ArfAttachment.parameterReq}
                  onChange={(e) => onChange('parameterReq', e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className='form-label'>Test Method Requested</label>
                <input
                  type="text"
                  className='form-control border border-dark'
                  name='methodReq'
                  value={ArfAttachment.methodReq}
                  onChange={(e) => onChange('methodReq', e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className='form-label'>Barangay</label>
                <input
                  type="text"
                  className='form-control border border-dark'
                  name='Barangay'
                  value={ArfAttachment.Barangay}
                  onChange={(e) => onChange('Barangay', e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className='form-label'>Municipality</label>
                <input
                  type="text"
                  className='form-control border border-dark'
                  name='Municipality'
                  value={ArfAttachment.Municipality}
                  onChange={(e) => onChange('Municipality', e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className='form-label'>Province</label>
                <input
                  type="text"
                  className='form-control border border-dark'
                  name='Province'
                  value={ArfAttachment.Province}
                  onChange={(e) => onChange('Province', e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}