import React from 'react';

export const RoaModal = ({show, onClose, reportDetails, onChange, onSubmit}) => {
    
    if(!show) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={onSubmit}>
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title">Add Report Details</h5>
                            <button type="button" className="btn-close" onClick={onClose}/>
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
                                <input
                                    type="text"
                                    className="form-control border border-dark"
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